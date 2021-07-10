import { JsonRpcProvider } from '@ethersproject/providers'
import { utils, Contract } from 'ethers'
import fetch from 'node-fetch'

// Example Helpers
import { XDAI_RPC_ENDPOINT } from './constants'
import { abi } from './artifacts/ERC20Mintable.json'
import { getWallets } from './helpers/wallet'
// Deployer credentials
import { mnemonic } from '../secrets.json'

import { FixedPriceSale__factory } from '../src/contracts'

const blockScoutUrl = 'https://blockscout.com/xdai/mainnet'

interface Purchaser {
  address: string
  amount: number
}

;(async () => {
  const provider = new JsonRpcProvider(XDAI_RPC_ENDPOINT)
  const [saleInvestor] = getWallets(mnemonic, provider)
  console.log(`Account being used: ${blockScoutUrl}/address/${saleInvestor.address}`)
  // Address of sale to close
  const saleAddress: string = process.argv[2]
  console.log(`Sale Contract: ${blockScoutUrl}/address/${saleAddress}`)

  // Get contract for sale with creator wallet
  const saleContract = FixedPriceSale__factory.connect(saleAddress, saleInvestor)

  const isClosed = await saleContract.isClosed()

  // WXDAI/tokenIn contract
  const tokenInAddress = await saleContract.tokenIn()
  const tokenInContract = new Contract(tokenInAddress, abi, saleInvestor)

  const purchasersMap: { [id: string]: Purchaser } = {}

  if (isClosed) {
    const transactions = await fetch(`${blockScoutUrl}/api?module=account&address=${saleAddress}&action=txlist`)
      .then(res => res.json())
      .then(json => json.result)

    for (const transaction of transactions) {
      if (!purchasersMap[transaction.from]) {
        const amount = parseFloat(utils.formatUnits(await saleContract.tokensPurchased(transaction.from)))
        purchasersMap[transaction.from] = { address: transaction.from, amount: amount }
      }
    }

    for (const purchaser of Object.values(purchasersMap)) {
      console.log(`Address: ${purchaser.address}`)
      console.log(`${purchaser.amount} WXDAI`)
      if (purchaser.amount > 0) {
        const tx = await tokenInContract.transfer(purchaser.address, utils.parseEther(purchaser.amount.toString()))
        console.log(`Refunded ${purchaser.amount} to ${purchaser.address}`)
        console.log({ tx })
      }
    }
  } else {
    console.log('Please close sale first')
  }
})()
