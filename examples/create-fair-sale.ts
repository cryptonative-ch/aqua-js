import { JsonRpcProvider } from '@ethersproject/providers'
import { utils, ContractFactory, ethers } from 'ethers'

// Example Helpers
import { abi, bytecode } from './artifacts/ERC20Mintable.json'
import { RINKEBY_DAI_ADDRESS, RINKEBY_INFURA_ENDPOINT } from './constants'
// import { getWallets } from './helpers/wallet'
// Deployer credentials
import { pk } from '../secrets.json'
// AquaJS
import { Aqua, RINKEBY_CONFIG } from '../src'
  ; (async () => {
    // Wrapped XDAI
    // Providers: XDAI or Rinkeby
    const provider = new JsonRpcProvider(RINKEBY_INFURA_ENDPOINT)
    // Connecto xDAI
    // const [saleCreator] = getWallets(mnemonic, provider)
    const saleCreator = new ethers.Wallet(pk, provider)
    // Start aqua instance
    const aqua = new Aqua(RINKEBY_CONFIG, saleCreator)
    const ERC20MintableFactory = new ContractFactory(abi, bytecode, saleCreator)
    // Deploy example tokens
    const aquaToken = await ERC20MintableFactory.deploy('FST', 'Fair Sale Token')
    console.log(`Deployed ${await aquaToken.symbol()} at ${aquaToken.address}`)
    // total tokens for sale is 1000
    const tokensForSale = utils.parseEther('50')
    // Mint tokensForSale to saleCreator
    await (await aquaToken.mint(saleCreator.address, tokensForSale)).wait(3)
    console.log(`Minted ${utils.formatEther(tokensForSale)} to ${saleCreator.address}`)
    // Approve saleLauncher by saleCreator
    await (await aquaToken.approve(aqua.saleLauncher.address, ethers.constants.MaxUint256)).wait(3)
    console.log(`Approved aqua.SaleLauncher to spend $${await aquaToken.symbol()}`)
    // Use the last block timestamp to set startDate and endDate
    const lastBlock = await provider.getBlock(await provider.getBlockNumber())
    const startDate = lastBlock.timestamp + 1800 // starts in 3 minutes from current block
    const endDate = startDate + 3600 * 72 // lasts for 72 hours
    // Start deploying the sale via the SDK
    console.log(`Launching new FairSale via AquaFactory`)
    // Create the sale
    const { sale, transactions } = await aqua.createFairSale(
      {
        tokenOut: aquaToken.address,
        tokenIn: RINKEBY_DAI_ADDRESS,
        auctionStartDate: startDate,
        auctionEndDate: endDate,
        orderCancelationPeriodDuration: endDate,
        tokensForSale,
        minRaise: utils.parseEther('5'), // 10% threshold
        minPrice: utils.parseEther('1'),
        minBuyAmount: utils.parseEther('0.1'),
        minimumBiddingAmountPerOrder: utils.parseEther('0.1'),
        tokenSupplier: saleCreator.address,
      },
      'bafybeibozpgzagp4opgu5ugmja2hpwdnyh675ofi44xobizpyr5gzqrxnu' // Example metadata IPFS hash
    )
    // Logging
    console.log(transactions)
    console.log(sale.address)
  })()
