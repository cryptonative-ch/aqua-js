// Externals
import { ContractReceipt, ContractTransaction } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
// Contracts
import { AquaFactory, Contracts, FixedPriceSale, SaleLauncher, TemplateLauncher } from './contracts'
// ABI encoders
import { encodeInitDataFixedPriceSale, encodeInitDataFairSale } from './encoders'
// Errors
import { AquaError, SaleTemplateNotRegistered } from './errors'
// Subgraph
import { Subgraph } from './Subgraph'
// Types/Interfaces
import { FixedPriceSaleOptions, FairPriceSaleOptions, AquaConfigMap } from './types'

interface AquaContracts {
  factory: AquaFactory
  saleLauncher: SaleLauncher
  templateLauncher: TemplateLauncher
}

interface CreateSaleReturn<T> {
  sale: T
  transactions: ContractTransaction[]
}

export class Aqua {
  readonly factory: AquaFactory
  readonly saleLauncher: SaleLauncher
  readonly templateLauncher: TemplateLauncher
  readonly subgraph: Subgraph
  readonly provider: Signer | Provider
  /**
   * Number of confirmation for all transactions
   */
  confirmationNumber: number

  constructor(
    { factory, saleLauncher, templateLauncher, subgraph }: AquaConfigMap,
    signerOrProvider: Signer | Provider
  ) {
    this.factory = Contracts.AquaFactory.connect(factory, signerOrProvider)
    this.saleLauncher = Contracts.SaleLauncher.connect(saleLauncher, signerOrProvider)
    this.templateLauncher = Contracts.TemplateLauncher.connect(templateLauncher, signerOrProvider)
    this.subgraph = new Subgraph(subgraph)
    this.provider = signerOrProvider
    this.confirmationNumber = 3
  }

  /**
   * Returns the three main contracts from the Mesa instance
   * - AquaFactory
   * - SaleLauncher
   * - TemplateLauncher
   * @returns `MesaContract`
   */
  contracts(): AquaContracts {
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
    const addTemplateTxReceipt = addTemplateTx.wait(this.confirmationNumber)
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
   * - Launch the a new template via `AquaFactory`
   * - Initialize the Sale from the template
   */
  async createFixedPriceSale(
    saleOptions: FixedPriceSaleOptions,
    metaData: string
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
    const launchTemplateTx = await this.factory.launchTemplate(
      fixedPriceSaleTemplate.id,
      saleOptionsInitDataBytes,
      metaData
    )
    // Add to transctions
    transactions.push(launchTemplateTx)
    const launchTemplateTxRecipt = await launchTemplateTx.wait(2)
    // Get the <Type>SaleTemplate address
    const templateAddress = this.getLaunchedTemplateAddress(launchTemplateTxRecipt)
    // Get the SaleTemplate address
    const saleTemplate = Contracts.FixedPriceSaleTemplate.connect(templateAddress, this.provider)
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
      fixedPriceSale: Contracts.FixedPriceSale.connect(newSaleAddress, this.provider),
      transactions,
    }
  }

  async createSale(
    saleOptions: FixedPriceSaleOptions | FairPriceSaleOptions,
    templateName: string,
    metaData: string
  ): Promise<{ fixedPriceSale: FixedPriceSale; transactions: ContractTransaction[] }> {
    // Store all transctions
    const transactions: ContractTransaction[] = []
    // Fetch the saleTemplateId
    const saleTemplates = await this.subgraph.getSaleTemplates()
    const template = saleTemplates.find(({ name }) => name == templateName)
    console.log({ template })
    if (!template) {
      throw new SaleTemplateNotRegistered(`Aqua: ${templateName} is not registered`)
    }
    // Encode sale data
    var saleOptionsInitDataBytes = null
    if (templateName === 'FixedPriceSaleTemplate') {
      saleOptionsInitDataBytes = encodeInitDataFixedPriceSale({
        ...(<FixedPriceSaleOptions>saleOptions),
        saleLauncher: this.saleLauncher.address,
        saleTemplateId: template.id,
      })
    } else if (templateName === 'FairSaleTemplate') {
      saleOptionsInitDataBytes = encodeInitDataFairSale({
        ...(<FairPriceSaleOptions>saleOptions),
        saleLauncher: this.saleLauncher.address,
        saleTemplateId: template.id,
      })
    } else {
      throw new AquaError(`No matching encoder found for ${templateName}`)
    }
    console.log({ saleOptionsInitDataBytes })

    // Launch a new template
    const launchTemplateTx = await this.factory.launchTemplate(template.id, saleOptionsInitDataBytes, metaData)
    console.log({ launchTemplateTx })
    // Add to transctions
    transactions.push(launchTemplateTx)
    const launchTemplateTxRecipt = await launchTemplateTx.wait(2)
    // Get the <Type>SaleTemplate address
    const templateAddress = this.getLaunchedTemplateAddress(launchTemplateTxRecipt)
    console.log({ templateAddress })
    // Get the SaleTemplate address
    var saleTemplate
    if (templateName === 'FixedPriceSaleTemplate') {
      saleTemplate = Contracts.FixedPriceSaleTemplate.connect(templateAddress, this.provider)
    } else if (templateName === 'FairSaleTemplate') {
      saleTemplate = Contracts.FairSaleTemplate.connect(templateAddress, this.provider)
    } else {
      throw new AquaError(`No matching encoder found for ${templateName}`)
    }
    console.log('creating sale')
    console.log({ saleTemplate })
    // const saleTemplate = Contracts.FairSaleTemplate.connect(templateAddress, this.provider)
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
      fixedPriceSale: Contracts.FixedPriceSale.connect(newSaleAddress, this.provider),
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
      throw new AquaError('Transction did not emit any event TemplateLaunched')
    }

    return eventTemplateLaunched.args.template as string
  }
}
