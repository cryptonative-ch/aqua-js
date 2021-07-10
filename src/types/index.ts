// Externals
import type { Provider } from '@ethersproject/providers'
import type { Signer } from 'ethers'
// Contracts
import { AquaFactory, SaleLauncher, TemplateLauncher } from '../contracts'
// Subgraph
import type { Subgraph } from '../Subgraph'
// Export
export type { InitDataFairSaleOptions, InitDataFixedPriceSaleOptions } from './encoders'
export type { FixedPriceSaleOptions } from './sales'
export type {
  BooleanMap,
  DocumentTimestampFields,
  FixedPriceSaleBase,
  FixedPriceSalePopulated,
  FixedPriceSalePurchase,
  MesaFactory,
  SaleTemplate,
  Token,
} from './subgraph'

export interface CreateInstanceOptions {
  factory: string
  saleLauncher: string
  templateLauncher: string
  provider: Provider | Signer
  subgraphEndpoint: string
}

export interface MesaContracts {
  factory: AquaFactory
  saleLauncher: SaleLauncher
  templateLauncher: TemplateLauncher
}

export interface MesaInstance<P = Provider | Signer> {
  contracts: MesaContracts
  subgraph: Subgraph
  provider: P
}

export interface AddSaleOptions {
  mesa: MesaInstance
  sale: string
}

export interface AddTemplateOptions {
  mesa: MesaInstance
  template: string
}

export interface MesaConfigMap {
  factory: string
  saleLauncher: string
  templateLauncher: string
  subgraph: string
}
