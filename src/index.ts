import { AquaConfigMap } from './types'
// Export everything
export * from './Aqua'
// Subgraph
export * from './Subgraph'
// Types
export * from './types'
// Export ABI encoders
export * as encoders from './encoders'
export * from './contracts'

// Preconfigured map for quick bootstraping
export const XDAI_CONFIG: AquaConfigMap = {
  factory: '0x0f1997E82cd484a54551b54009DdcE39deaE973f',
  saleLauncher: '0xC28c613f0f0b85C745AC58BA78071816Cb52B43A',
  templateLauncher: '0x58c67b46c47f69d63aa09d5f822ede377c479d5f',
  subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/aqua-xdai-next',
}

export const RINKEBY_CONFIG: AquaConfigMap = {
  factory: '0x6f90A6b92b69A775d0a2231011b3704d876b51a8',
  saleLauncher: '0x6f90A6b92b69A775d0a2231011b3704d876b51a8',
  templateLauncher: '0xA731dEc18bD791D817bd67E9944793D5BF76f5C0',
  subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/mesa',
}
