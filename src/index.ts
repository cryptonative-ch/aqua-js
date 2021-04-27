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
  factory: '0xefb5490683bE4AE8de4bFB05a84Ef0F79d9DC2db',
  saleLauncher: '0x646219EaE83eD7dff641332B36402350FA9a0CdA',
  templateLauncher: '0x1C55a988E025492dDcf872CA68a8562dfEBAe5C9',
  subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/mesa-xdai',
}

export const RINKEBY_CONFIG: MesaConfigMap = {
  factory: '0xd0ab3620E1A592FD26E115EAcd59E6FE62C6c421',
  saleLauncher: '0xF9008327125bB1315a4577F034E4FF5C81248d90',
  templateLauncher: '0x2Fb3C82b749f806A954E2b41A1e692196be466a8',
  subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/mesa',
}
