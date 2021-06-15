import { JsonRpcProvider } from '@ethersproject/providers'
import { utils } from 'ethers'
import fetch from 'node-fetch'

// Example Helpers
import { XDAI_RPC_ENDPOINT } from './constants'
import { getWallets } from './helpers/wallet'
// Deployer credentials
import { mnemonic } from '../secrets.json'

import { FixedPriceSale__factory } from '../src/contracts'

const blockScoutUrl = 'https://blockscout.com/xdai/mainnet/'

;(async () => {
  const provider = new JsonRpcProvider(XDAI_RPC_ENDPOINT)
  const [saleCreator] = getWallets(mnemonic, provider)
  console.log(`Account being used: ${blockScoutUrl}address/${saleCreator.address}`)
  // Address of sale to close
  const saleAddress: string = process.argv[2]
  console.log(`Sale Contract: ${blockScoutUrl}address/${saleAddress}`)

  // Get contract for sale with creator wallet
  const saleContract = FixedPriceSale__factory.connect(saleAddress, saleCreator)

  let isClosed = await saleContract.isClosed()

  const tokenSold = await saleContract.tokensSold()
  console.log({ tokenSold: utils.formatEther(tokenSold) })

  const minRaise = await saleContract.minimumRaise()
  console.log({ minRaise: utils.formatEther(minRaise) })

  // Display transactions from sale contract
  try {
    console.log('\nContract transactions: ')
    const transactions = await fetch(`${blockScoutUrl}api?module=account&address=${saleAddress}&action=txlist`)
      .then(res => res.json())
      .then(json => json.result)
    transactions.forEach((tx: any) => {
      console.log(`${blockScoutUrl}tx/${tx.hash}`)
    })
  } catch (err) {
    console.log(err)
    console.log('Error occurred while getting all purchasing addresses')
  }

  if (tokenSold.gt(minRaise) && !isClosed) {
    await saleContract.closeSale()
    isClosed = await saleContract.isClosed()
    console.log({ isClosed })
  } else {
    console.log(`\nSale cannot be closed`)
    console.log(`${tokenSold.lt(minRaise) ? 'Min threshold not reached' : 'Already closed'}`)
  }
  if (isClosed) {
    await saleContract.withdrawFunds()
    await saleContract.withdrawUnsoldFunds()
    console.log('\nWithdrawn funds')
  }
})()
