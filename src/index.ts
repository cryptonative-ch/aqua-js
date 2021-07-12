import { MesaConfigMap } from './types'
// Export everything
export * from './Mesa'
// Subgraph
export * from './Subgraph'
// Types
export * from './types'
// Export ABI encoders
export * as encoders from './encoders'

// Preconfigured map for quick bootstraping
export const XDAI_CONFIG: MesaConfigMap = {
  factory: '0x6897427e8d129d040F066a3Dcb106da91e84ab47',
  saleLauncher: '0xfa4Fbd5DC4a0C3aE54aA3a1fE52099d7d6F94227',
  templateLauncher: '0x1c1006D122A7f09A047f42D16464A3e7fBdB24C2',
  subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/aqua-xdai-dev',
}

export const RINKEBY_CONFIG: MesaConfigMap = {
  factory: '0x6f90A6b92b69A775d0a2231011b3704d876b51a8',
  saleLauncher: '0x6f90A6b92b69A775d0a2231011b3704d876b51a8',
  templateLauncher: '0xA731dEc18bD791D817bd67E9944793D5BF76f5C0',
  subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/mesa',
}
