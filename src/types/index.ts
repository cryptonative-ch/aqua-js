// Externals
import { BigNumber, providers } from 'ethers'
// Contracts
import { MesaFactory, SaleLauncher, TemplateLauncher } from 'src/contracts'
// Subgraph
import { Subgraph } from 'src/Subgraph'

export interface CreateInstanceOptions {
  factory: string
  saleLauncher: string
  templateLauncher: string
  provider: providers.Provider
  subgraphEndpoint: string
}

export interface Contracts {
  factory: MesaFactory
  saleLauncher: SaleLauncher
  templateLauncher: TemplateLauncher
}

export interface MesaInstance {
  contracts: Contracts
  subgraph: Subgraph
  provider: providers.Provider
}

export interface AddSaleOptions {
  mesa: MesaInstance
  sale: string
}

export interface AddTemplateOptions {
  mesa: MesaInstance
  template: string
}
