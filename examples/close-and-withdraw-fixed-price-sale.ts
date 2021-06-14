import { JsonRpcProvider } from '@ethersproject/providers'
import { utils } from 'ethers'

// Example Helpers
import { XDAI_RPC_ENDPOINT } from './constants'
import { getWallets } from './helpers/wallet'
// Deployer credentials
import { mnemonic } from '../secrets.json'

import { FixedPriceSale__factory } from '../src/contracts'
;(async () => {
  const provider = new JsonRpcProvider(XDAI_RPC_ENDPOINT)
  const [saleCreator] = getWallets(mnemonic, provider)
  // Address of sale to close
  const saleAddress: string = process.argv[2]
  console.log({ saleAddress })

  // Get contract for sale with creator wallet
  const saleContract = FixedPriceSale__factory.connect(saleAddress, saleCreator)

  let isClosed = await saleContract.isClosed()
  const tokenSold = await saleContract.tokensSold()
  const minRaise = await saleContract.minimumRaise()
  // DIsplay purchasers + amounts
  // Maybe a bug with fractional tokens causing issues
  try {
    console.log('Token Purchasers + Amounts: ')
    // Since there is currently no function in contract to get number of purchasers or a function to return all addresses
    // A count of tokens must be used to get know when at end of array
    // This fails when tokens have been withdrawn
    let remainingTokensToCount = parseFloat(utils.formatEther(tokenSold))
    let i = 0
    while (remainingTokensToCount > 0) {
      const orderOwners = await saleContract.orderOwners(i)
      const tokenQuantity = parseFloat(utils.formatEther(await saleContract.tokensPurchased(orderOwners)))
      console.log(`${orderOwners}: ${tokenQuantity} tokens`)
      remainingTokensToCount = remainingTokensToCount - tokenQuantity
      i++
    }
  } catch (err) {
    console.log('Error occurred while getting all purchasing addresses')
  }

  if (tokenSold.gt(minRaise) && !isClosed) {
    await saleContract.closeSale()
    isClosed = await saleContract.isClosed()
    console.log({ isClosed })
  } else {
    console.log(`Sale cannot be closed`)
    console.log(`${tokenSold.gt(minRaise) ? 'Min threshold not reached' : 'Already closed'}`)
  }
  if (isClosed) {
    await saleContract.withdrawFunds()
    await saleContract.withdrawUnsoldFunds()
    console.log('Withdrawn funds')
  }
})()
