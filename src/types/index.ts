// Externals
import type { Provider } from '@ethersproject/providers'
import type { Signer } from 'ethers'
// Contracts
import type { AquaFactory, SaleLauncher, TemplateLauncher } from '@dxdao/aqua-sc'
// Subgraph
import type { Subgraph } from '../Subgraph'
// Export
export type { InitDataFairSaleOptions, InitDataFixedPriceSaleOptions } from '@dxdao/aqua-sc'
export type { FixedPriceSaleOptions, FairPriceSaleOptions } from './sales'
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

export interface AquaContracts {
  factory: AquaFactory
  saleLauncher: SaleLauncher
  templateLauncher: TemplateLauncher
}

export interface AquaInstance<P = Provider | Signer> {
  contracts: AquaContracts
  subgraph: Subgraph
  provider: P
}

export interface AddSaleOptions {
  aqua: AquaInstance
  sale: string
}

export interface AddTemplateOptions {
  aqua: AquaInstance
  template: string
}

export interface AquaConfigMap {
  factory: string
  saleLauncher: string
  templateLauncher: string
  subgraph: string
}
