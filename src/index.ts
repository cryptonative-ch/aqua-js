import { AquaConfigMap } from './types'
import { getContractAddressesForChainOrThrow, ChainId } from "@dxdao/aqua-sc"
// Export everything
export * from './Aqua'
// Subgraph
export * from './Subgraph'
// Types
export * from './types'
// Export ABI encoders
export * from '@dxdao/aqua-sc'


// Preconfigured map for quick bootstraping
const xdaiAddresses = getContractAddressesForChainOrThrow(ChainId.xdai)
export const XDAI_CONFIG: AquaConfigMap = {
  factory: xdaiAddresses.aquaFactory,
  saleLauncher: xdaiAddresses.saleLauncher,
  templateLauncher: xdaiAddresses.templateLauncher,
  subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/aqua-xdai-next',
}

const rinkebyAddresses = getContractAddressesForChainOrThrow(ChainId.rinkeby)
export const RINKEBY_CONFIG: AquaConfigMap = {
  factory: rinkebyAddresses.aquaFactory,
  saleLauncher: rinkebyAddresses.saleLauncher,
  templateLauncher: rinkebyAddresses.templateLauncher,
  subgraph: 'https://api.thegraph.com/subgraphs/name/mprasanjith/aqua-rinkeby-next',
}
