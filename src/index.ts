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
  factory: '0x15edf1De363654A749eD5Af116C7e03d99892140',
  saleLauncher: '0x8AfD7eDE2B07158FdAc784884a4F44E39799a0a2',
  templateLauncher: '0x02D4DF1316Eed1C8d170c04aa6e42128dD3Ed11A',
  subgraph: 'https://api.thegraph.com/subgraphs/name/adamazad/aqua-xdai-next',
}

export const RINKEBY_CONFIG: AquaConfigMap = {
  factory: '0xA4bEdDf001392121a88192a2a2348c9102e8E6B3',
  saleLauncher: '0x248617E4f69E86a727A4e03bA8d6e65A23d12e45',
  templateLauncher: '0xC8Ab9E079D8207fB755953b0C464C8C5313FE83a',
  subgraph: 'https://api.thegraph.com/subgraphs/name/mprasanjith/aqua-rinkeby-next',
}
