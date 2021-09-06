import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from 'ethers'
// Import lib
import { Aqua, XDAI_CONFIG } from '../src'
import { mnemonic } from '../secrets.json'
  ; (async () => {
    const provider = new JsonRpcProvider('https://rpc.xdaichain.com/')
    const wallet = Wallet.fromMnemonic(mnemonic)
    const aqua = new Aqua(XDAI_CONFIG, wallet.connect(provider))
    console.log(await aqua.subgraph.getSaleTemplates())
    console.log(await aqua.subgraph.getSaleTemplateById('2'))
  })()
