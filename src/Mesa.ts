// Externals
import { Provider, TransactionReceipt } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { BigNumber, BigNumberish, BytesLike, ContractReceipt, ContractTransaction, Event } from 'ethers'
// Contracts
import {
  FixedPriceSaleTemplate__factory,
  TemplateLauncher__factory,
  FixedPriceSale__factory,
  SaleLauncher__factory,
  MesaFactory__factory,
  TemplateLauncher,
  FixedPriceSale,
  SaleLauncher,
  MesaFactory,
} from './contracts'
// ABI encoders
import { encodeInitDataFixedPriceSale } from './encoders'
// Errors
import { MesaError, SaleTemplateNotRegistered } from './errors'
// Subgraph
import { Subgraph } from './Subgraph'
// Types/Interfaces
import { FixedPriceSaleOptions, MesaConfigMap } from './types'

interface MesaContracts {
  factory: MesaFactory
  saleLauncher: SaleLauncher
  templateLauncher: TemplateLauncher
}

export class Mesa {
  readonly factory: MesaFactory
  readonly saleLauncher: SaleLauncher
  readonly templateLauncher: TemplateLauncher
  readonly subgraph: Subgraph
  readonly provider: Signer | Provider

  constructor(
    { factory, saleLauncher, templateLauncher, subgraph }: MesaConfigMap,
    signerOrProvider: Signer | Provider
  ) {
    this.factory = MesaFactory__factory.connect(factory, signerOrProvider)
    this.saleLauncher = SaleLauncher__factory.connect(saleLauncher, signerOrProvider)
    this.templateLauncher = TemplateLauncher__factory.connect(templateLauncher, signerOrProvider)
    this.subgraph = new Subgraph(subgraph)
    this.provider = signerOrProvider
  }

  /**
   * Returns the three main contracts from the Mesa instance
   * - MesaFactory
   * - SaleLauncher
   * - TemplateLauncher
   * @returns `MesaContract`
   */
  contracts(): MesaContracts {
    return {
      factory: this.factory,
      saleLauncher: this.saleLauncher,
      templateLauncher: this.templateLauncher,
    }
  }

  /**
   * Adds a new Sale contract (module) to SaleLauncher contract
   * @param mesa the Mesa instance
   * @param saleAddress <SaleType>Template contract address
   * @returns `ContractReceipt`
   * @throws any
   */
  async addSaleModule(saleAddress: string) {
    const addTemplateTx = await this.saleLauncher.addTemplate(saleAddress)
    const addTemplateTxReceipt = addTemplateTx.wait(1)
    return addTemplateTxReceipt
  }

  /**
   * Adds a new Sale contract to TemplateLauncher contract
   * @param mesa the Mesa instance
   * @param templateAddress <SaleType>Template contract address
   * @returns `ContractReceipt`
   * @throws transactional errors from the contract
   */
  async addSaleTemplate(saleTemplateAddress: string) {
    const addTemplateTx = await this.templateLauncher.addTemplate(saleTemplateAddress)
    const addTemplateTxReceipt = await addTemplateTx.wait(1)
    return addTemplateTxReceipt
  }

  /**
   * Creates a new FixedPriceSale and returns the FixedPriceSale instance. Involves:
   * - Fetch the FixedPriceSaleTemplate from the subgraph
   * - Launch the a new template via `MesaFactory`
   * - Initialize the Sale from the template
   * @param mesa the Mesa instance
   * @param saleOptions the sale options. See `FixedPriceSaleOptions`
   * @returns `FixedPriceSale` instance
   * @throws `SaleTemplateNotRegistered` if the template is not found
   */
  async createFixedPriceSale(
    saleOptions: FixedPriceSaleOptions
  ): Promise<{ fixedPriceSale: FixedPriceSale; transactions: ContractTransaction[] }> {
    // Store all transctions
    const transactions: ContractTransaction[] = []
    // Fetch the saleTemplateId
    const saleTemplates = await this.subgraph.getSaleTemplates()
    const fixedPriceSaleTemplate = saleTemplates.find(({ name }) => name == 'FixedPriceSaleTemplate')
    if (!fixedPriceSaleTemplate) {
      throw new SaleTemplateNotRegistered('Mesa: FixedPriceSaleTemplate is not registered')
    }
    // Encode sale data
    const saleOptionsInitDataBytes = encodeInitDataFixedPriceSale({
      ...saleOptions,
      saleLauncher: this.saleLauncher.address,
      saleTemplateId: fixedPriceSaleTemplate.id,
    })
    // Launch a new template
    const launchTemplateTx = await this.factory.launchTemplate(fixedPriceSaleTemplate.id, saleOptionsInitDataBytes)
    // Add to transctions
    transactions.push(launchTemplateTx)
    const launchTemplateTxRecipt = await launchTemplateTx.wait(2)
    // Get the <Type>SaleTemplate address
    const templateAddress = this.getLaunchedTemplateAddress(launchTemplateTxRecipt)
    // Get the SaleTemplate address
    const saleTemplate = FixedPriceSaleTemplate__factory.connect(templateAddress, this.provider)
    // Sale fee
    const createSaleTx = await saleTemplate.createSale({
      value: await this.factory.saleFee(), // fetch the saleFee from the Factory
    })
    // Add to transactions
    transactions.push(createSaleTx)
    const createSaleTxReceipt = await createSaleTx.wait(3)
    // Add to transctions
    // Extract the newSale from logs
    const newSaleAddress = `0x${createSaleTxReceipt.logs[0].topics[1].substring(26)}`
    return {
      fixedPriceSale: FixedPriceSale__factory.connect(newSaleAddress, this.provider),
      transactions,
    }
  }

  /**
   * Accepts a `ContractReceipt` and tries to find `TemplateLaunched(address,uint256)` event and returns the template address
   * @param transctionReceipt
   */
  getLaunchedTemplateAddress(transctionReceipt: ContractReceipt): string {
    // Extract the new SaleTemplate address from TemplateLaunched event
    if (!transctionReceipt.events) {
      throw new MesaError('Transction did not emit any event')
    }
    // Filter TemplateLaunched
    const eventTemplateLaunched = transctionReceipt.events.find(
      event => event.event === this.factory.interface.events['TemplateLaunched(address,uint256)'].name
    )
    // Event was not found
    if (!eventTemplateLaunched || !eventTemplateLaunched.args) {
      throw new MesaError('Transction did not emit any event TemplateLaunched')
    }

    return eventTemplateLaunched.args.template as string
  }
}
