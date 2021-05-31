import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from 'ethers'
// Import lib
import { Mesa, XDAI_CONFIG } from '../src'
import { mnemonic } from '../secrets.json'
;(async () => {
  const provider = new JsonRpcProvider('https://rpc.xdaichain.com/')
  const wallet = Wallet.fromMnemonic(mnemonic)
  const mesa = new Mesa(XDAI_CONFIG, wallet.connect(provider))
  console.log(await mesa.subgraph.getSaleTemplates())
  console.log(await mesa.subgraph.getSaleTemplateById('2'))
})()
