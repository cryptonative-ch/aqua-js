// Externals
import { BigNumber } from '@ethersproject/bignumber'
import Axios from 'axios'
// Subgraph Schema types
import { FixedPriceSaleBase, MesaFactory, SaleTemplate } from './types/subgraph'

interface SubgraphResponse<T = any> {
  data: {
    [name: string]: T
  }
}

type KeyValuePair = [key: string, value: any]

interface SubgraphSchemaFieldTypes {
  [key: string]: typeof BigNumber | NumberConstructor | StringConstructor | BooleanConstructor
}

export class Subgraph {
  private endpoint: string
  static MESA_FACTORY_ID = 'MesaFactory'

  static MESA_FACTORY_FIELDS: SubgraphSchemaFieldTypes = {
    id: String,
    saleCount: Number,
    address: String,
    feeManager: String,
    feeTo: String,
    templateManager: String,
    templateLauncher: String,
    saleFee: BigNumber,
    feeNumerator: BigNumber,
    templateFee: BigNumber,
  }

  static SALE_TEMPLATE_FIELDS: SubgraphSchemaFieldTypes = {
    id: Number,
    createdAt: Number,
    updatedAt: Number,
    deletedAt: Number,
    address: String,
    factory: String,
    name: String,
    verified: Boolean,
  }

  static FIXED_PRICE_SALE_FIELDS: SubgraphSchemaFieldTypes = {
    id: Number,
    createdAt: Number,
    updatedAt: Number,
    deletedAt: Number,
    name: String,
  }

  static FIXED_PRICE_SALE_PURCHASE_FIELDS: SubgraphSchemaFieldTypes = {
    amount: BigNumber,
    buyer: String,
  }

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  /**
   * General GraphQL query
   * @param query
   * @returns
   */
  async query<T = any, R = SubgraphResponse<T>>(query: string): Promise<R> {
    const res = await Axios.post<R>(
      this.endpoint,
      {
        query,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(res.data)
    return res.data
  }

  async getMesaFactory(fields?: string): Promise<MesaFactory> {
    const { data } = await this.query<MesaFactory>(`{
      mesaFactory (id: "${Subgraph.MESA_FACTORY_ID}") {
        ${fields || Object.keys(Subgraph.MESA_FACTORY_FIELDS).join(', ')}
      }
    }`)
    // Map value to correct types
    const mesaFactory = Object.entries(data.mesaFactory).reduce<MesaFactory>((acc, [key, value]) => {
      const fixedValue = this.mapBigDecimalToBigNumber(Subgraph.MESA_FACTORY_FIELDS, [key, value])
      acc[key] = fixedValue
      return acc
    }, {} as MesaFactory)

    return mesaFactory
  }

  async getFixedPriceSales(fields?: string): Promise<FixedPriceSaleBase[]> {
    const { data } = await this.query<FixedPriceSaleBase[]>(`{
      fixedPriceSales {
        ${fields || Object.keys(Subgraph.FIXED_PRICE_SALE_FIELDS).join(', ')}
      }
    }`)
    // Map value to correct types
    const fixedPriceSales = data.fixedPriceSales.map(fixedPriceSale => {
      return Object.entries(fixedPriceSale).reduce<FixedPriceSaleBase>((acc, [key, value]) => {
        const fixedValue = this.mapBigDecimalToBigNumber(Subgraph.FIXED_PRICE_SALE_FIELDS, value)
        acc[key] = fixedValue
        return acc
      }, {} as FixedPriceSaleBase)
    })

    return fixedPriceSales
  }

  async getFixedPriceSaleByAddress(address: string, fields?: string): Promise<FixedPriceSaleBase> {
    const { data } = await this.query<FixedPriceSaleBase>(`{
      fixedPriceSale (id: "${address}") {
        ${fields || Object.keys(Subgraph.FIXED_PRICE_SALE_FIELDS).join(', ')}
      }
    }`)
    // Map value to correct types
    return Object.entries(data.fixedPriceSale).reduce<FixedPriceSaleBase>((acc, [key, value]) => {
      const fixedValue = this.mapBigDecimalToBigNumber(Subgraph.FIXED_PRICE_SALE_FIELDS, value)
      acc[key] = fixedValue
      return acc
    }, {} as FixedPriceSaleBase)
  }

  async getSaleTemplates(fields?: string) {
    const { data } = await this.query<SaleTemplate[]>(`{
      saleTemplates {
        ${fields || Object.keys(Subgraph.SALE_TEMPLATE_FIELDS).join(', ')}
      }
    }`)
    return data.saleTemplates
  }

  async getSaleTemplateById(id: string, fields?: string): Promise<SaleTemplate> {
    const { data } = await this.query<SaleTemplate>(`{
      saleTemplate (id: "${id}") {
        ${fields || Object.keys(Subgraph.SALE_TEMPLATE_FIELDS).join(', ')}
      }
    }`)
    // Doesn't have BigDecimal
    return data.saleTemplate
  }

  mapBigDecimalToBigNumber(schema: SubgraphSchemaFieldTypes, [key, value]: KeyValuePair): string | number | BigNumber {
    // The value should be BigNumber
    if (schema[key] === BigNumber) {
      return BigNumber.from(value)
    }
    return value
  }

  mapBigDecimalToBigNumberRecursive(
    schema: SubgraphSchemaFieldTypes,
    [key, value]: KeyValuePair
  ): string | number | BigNumber {
    // The value should be BigNumber
    if (schema.key && schema[key] === BigNumber) {
      return BigNumber.from(value)
    }
    return value
  }
}
