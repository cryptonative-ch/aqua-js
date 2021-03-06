import { JsonRpcProvider } from '@ethersproject/providers'
import { utils, ContractFactory, ethers } from 'ethers'

// Example Helpers
import { abi, bytecode } from './artifacts/ERC20Mintable.json'
import { WXDAI_ADDRESS, XDAI_RPC_ENDPOINT } from './constants'
// import { getWallets } from './helpers/wallet'
// Deployer credentials
import { pk } from '../secrets.json'
// AquaJS
import { Aqua, XDAI_CONFIG } from '../src'
  ; (async () => {
    // Wrapped XDAI
    // Providers: XDAI or Rinkeby
    const provider = new JsonRpcProvider(XDAI_RPC_ENDPOINT)
    // Connecto xDAI
    // const [saleCreator] = getWallets(mnemonic, provider)
    const saleCreator = new ethers.Wallet(pk, provider)
    // Start Aqua instance
    const aqua = new Aqua(XDAI_CONFIG, saleCreator)
    const ERC20MintableFactory = new ContractFactory(abi, bytecode, saleCreator)
    // Deploy example tokens
    const aquaToken = await ERC20MintableFactory.deploy('FPST', 'Fixed Price Sale Token')
    console.log(`Deployed ${await aquaToken.symbol()} at ${aquaToken.address}`)
    // total tokens for sale is 1000
    const tokensForSale = utils.parseEther('50')
    // Mint tokensForSale to saleCreator
    await (await aquaToken.mint(saleCreator.address, tokensForSale)).wait(3)
    console.log(`Minted ${utils.formatEther(tokensForSale)} to ${saleCreator.address}`)
    // Approve saleLauncher by saleCreator
    await (await aquaToken.approve(aqua.saleLauncher.address, ethers.constants.MaxUint256)).wait(3)
    console.log(`Approved Aqua.SaleLauncher to spend $${await aquaToken.symbol()}`)
    // Use the last block timestamp to set startDate and endDate
    const lastBlock = await provider.getBlock(await provider.getBlockNumber())
    const startDate = lastBlock.timestamp + 180 // starts in 3 minutes from current block
    const endDate = startDate + 3600 * 1 // lasts for 72 hours
    // Start deploying the sale via the SDK
    console.log(`Launching new FixedPriceSale via AquaFactory`)
    // Create the sale
    const { sale, transactions } = await aqua.createFixedPriceSale(
      {
        maxCommitment: utils.parseEther('5'), // 5 WXDAI
        minCommitment: utils.parseEther('0.1'), // 1 WXDAI
        tokensForSale, // 50 FPST tokens for sale
        minRaise: utils.parseEther('40'), // 80% threshold
        tokenPrice: utils.parseEther('10'),
        tokenSupplier: saleCreator.address,
        tokenOut: aquaToken.address,
        tokenIn: WXDAI_ADDRESS,
        // owner: saleCreator.address,
        startDate,
        endDate,
        participantList: false,
      },
      'bafybeibozpgzagp4opgu5ugmja2hpwdnyh675ofi44xobizpyr5gzqrxnu' // Example metadata IPFS hash
    )
    // Logging
    console.log(transactions)
    console.log(sale.address)
    // Play with the FixedPriceSale
  })()
