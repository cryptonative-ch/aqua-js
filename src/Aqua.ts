// Externals
import { ContractReceipt, ContractTransaction } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
// Contracts
import {
  AquaFactory,
  AquaFactory__factory,
  FairSale,
  FairSale__factory,
  FixedPriceSale,
  FixedPriceSale__factory,
  SaleLauncher,
  SaleLauncher__factory,
  TemplateLauncher,
  TemplateLauncher__factory,
  FixedPriceSaleTemplate__factory,
  encodeInitDataFairSale,
  encodeInitDataFixedPriceSale,
} from '@dxdao/aqua-sc'
// Errors
import { AquaError, SaleTemplateNotRegistered } from './errors'
// Subgraph
import { Subgraph } from './Subgraph'
// Types/Interfaces
import { FixedPriceSaleOptions, FairPriceSaleOptions, AquaConfigMap, AquaContracts } from './types'

interface CreateSaleReturn<T> {
  sale: T
  transactions: ContractTransaction[]
}

export class Aqua {
  /**
   * `AquaFactory` contract instance
   */
  readonly factory: AquaFactory
  /**
   * `SaleLauncher` contract instance
   */
  readonly saleLauncher: SaleLauncher
  /**
   * `TemplateLauncher` contract instance
   */
  readonly templateLauncher: TemplateLauncher
  /**
   * Subgraph instance
   */
  readonly subgraph: Subgraph
  /**
   * Signer to be used for all transactions
   */
  readonly provider: Signer | Provider
  /**
   * Number of confirmation for all transactions
   */
  confirmationNumber: number

  constructor(
    { factory, saleLauncher, templateLauncher, subgraph }: AquaConfigMap,
    signerOrProvider: Signer | Provider
  ) {
    this.factory = AquaFactory__factory.connect(factory, signerOrProvider)
    this.saleLauncher = SaleLauncher__factory.connect(saleLauncher, signerOrProvider)
    this.templateLauncher = TemplateLauncher__factory.connect(templateLauncher, signerOrProvider)
    this.subgraph = new Subgraph(subgraph)
    this.provider = signerOrProvider
    this.confirmationNumber = 3
  }

  /**
   * Returns the three main contracts from the Aqua instance
   * - AquaFactory
   * - SaleLauncher
   * - TemplateLauncher
   * @returns `AquaContract`
   */
  contracts(): AquaContracts {
    return {
      factory: this.factory,
      saleLauncher: this.saleLauncher,
      templateLauncher: this.templateLauncher,
    }
  }

  /**
   * Adds a new Sale contract (module) to `SaleLauncher` contract
   * @param saleAddress <SaleType>Template contract address
   * @returns `ContractReceipt`
   * @throws any
   */
  async addSaleModule(saleAddress: string) {
    const addTemplateTx = await this.saleLauncher.addTemplate(saleAddress)
    const addTemplateTxReceipt = addTemplateTx.wait(this.confirmationNumber)
    return addTemplateTxReceipt
  }

  /**
   * Adds a new Sale contract to `TemplateLauncher` contract
   * @param templateAddress <SaleType>Template contract address
   * @returns `ContractReceipt`
   * @throws transactional errors from the contract
   */
  async addSaleTemplate(saleTemplateAddress: string) {
    const addTemplateTx = await this.templateLauncher.addTemplate(saleTemplateAddress)
    const addTemplateTxReceipt = await addTemplateTx.wait(this.confirmationNumber)
    return addTemplateTxReceipt
  }

  /**
   * Creates a new FixedPriceSale and returns the FixedPriceSale instance. Involves:
   * - Fetch the FixedPriceSaleTemplate from the subgraph
   * - Launch the a new template via `AquaFactory`
   * - Initialize the Sale from the template
   */
  async createFixedPriceSale(
    saleOptions: FixedPriceSaleOptions,
    metaData: string
  ): Promise<CreateSaleReturn<FixedPriceSale>> {
    //
    const templateName = `FixedPriceSaleTemplate`
    // Store all transctions
    const transactions: ContractTransaction[] = []
    // Fetch the saleTemplateId
    const saleTemplates = await this.subgraph.getSaleTemplates()
    const template = saleTemplates.find(({ name }) => name == templateName)
    // Without a source template, the sale template cannot be launched
    if (!template) {
      throw new SaleTemplateNotRegistered(templateName)
    }
    // Encode sale data
    const saleOptionsInitDataBytes = encodeInitDataFixedPriceSale({
      ...saleOptions,
      saleLauncher: this.saleLauncher.address,
      saleTemplateId: template.id,
    })
    // Launch a new template
    const launchTemplateTx = await this.factory.launchTemplate(template.id, saleOptionsInitDataBytes, metaData)
    // Add to transctions
    transactions.push(launchTemplateTx)
    const launchTemplateTxRecipt = await launchTemplateTx.wait(this.confirmationNumber)
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

    const createSaleTxReceipt = await createSaleTx.wait(this.confirmationNumber)
    // Extract the newSale from logs
    const newSaleAddress = `0x${createSaleTxReceipt.logs[0].topics[1].substring(26)}`
    // Return sale and transactions
    return {
      sale: FixedPriceSale__factory.connect(newSaleAddress, this.provider),
      transactions,
    }
  }

  /**
   * Creates a new `FairSale` and returns the `FairSale` contract instance. Involves:
   * - Fetch the `FairSaleTemplate`'s ID from the subgraph
   * - Launch the a new `FairSaleTemplate` template via `AquaFactory`
   * - Initialize the `FairSale` from the template
   */
  async createFairSale(saleOptions: FairPriceSaleOptions, metaData: string): Promise<CreateSaleReturn<FairSale>> {
    // Sale template name
    const templateName = `FairSaleTemplate`
    // Store all transctions
    const transactions: ContractTransaction[] = []
    // Fetch the saleTemplateId
    const saleTemplates = await this.subgraph.getSaleTemplates()
    const template = saleTemplates.find(({ name }) => name == templateName)
    // Without a source template, the sale template cannot be launched
    if (!template) {
      throw new SaleTemplateNotRegistered(templateName)
    }
    // Encode sale data
    const saleOptionsInitDataBytes = encodeInitDataFairSale({
      ...saleOptions,
      saleLauncher: this.saleLauncher.address,
      saleTemplateId: template.id,
    })
    // Launch a new template
    const launchTemplateTx = await this.factory.launchTemplate(template.id, saleOptionsInitDataBytes, metaData)
    // Add to transctions
    transactions.push(launchTemplateTx)
    const launchTemplateTxRecipt = await launchTemplateTx.wait(this.confirmationNumber)
    // Get the <Type>SaleTemplate address
    const templateAddress = this.getLaunchedTemplateAddress(launchTemplateTxRecipt)
    // Get the SaleTemplate address
    const saleTemplate = FixedPriceSaleTemplate__factory.connect(templateAddress, this.provider)
    // Create the sale from the template
    const createSaleTx = await saleTemplate.createSale({
      value: await this.factory.saleFee(), // fetch the saleFee from the Factory
    })

    // Add to transactions
    transactions.push(createSaleTx)

    const createSaleTxReceipt = await createSaleTx.wait(this.confirmationNumber)
    // Extract the newSale from logs
    const newSaleAddress = `0x${createSaleTxReceipt.logs[0].topics[1].substring(26)}`
    // Return sale and transactions
    return {
      sale: FairSale__factory.connect(newSaleAddress, this.provider),
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
      throw new AquaError('Transction did not emit any event')
    }
    // Filter TemplateLaunched
    const eventTemplateLaunched = transctionReceipt.events.find(
      event => event.event === this.factory.interface.events['TemplateLaunched(address,uint256)'].name
    )
    // Event was not found
    if (!eventTemplateLaunched || !eventTemplateLaunched.args) {
      throw new AquaError('Transction did not emit TemplateLaunched event')
    }

    return eventTemplateLaunched.args.template as string
  }
}
