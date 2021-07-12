import { JsonRpcProvider } from '@ethersproject/providers'
import { utils, ContractFactory, ethers } from 'ethers'

// Example Helpers
import { abi, bytecode } from './artifacts/ERC20Mintable.json'
import { WXDAI_ADDRESS, XDAI_RPC_ENDPOINT } from './constants'
import { getWallets } from './helpers/wallet'
// Deployer credentials
import { mnemonic } from '../secrets.json'
// MesaJS
import { Mesa, XDAI_CONFIG } from '../src'
;(async () => {
  // Wrapped XDAI
  // Providers: XDAI or Rinkeby
  const provider = new JsonRpcProvider(XDAI_RPC_ENDPOINT)
  // Connecto xDAI
  const [saleCreator] = getWallets(mnemonic, provider)
  // Start Mesa instance
  const mesa = new Mesa(XDAI_CONFIG, saleCreator)
  const ERC20MintableFactory = new ContractFactory(abi, bytecode, saleCreator)
  // Deploy example tokens
  const mesaToken = await ERC20MintableFactory.deploy('FPST', 'Fixed Price Sale Token')
  console.log(`Deployed ${await mesaToken.symbol()} at ${mesaToken.address}`)
  // total tokens for sale is 1000
  const tokensForSale = utils.parseEther('50')
  // Mint tokensForSale to saleCreator
  await (await mesaToken.mint(saleCreator.address, tokensForSale)).wait(3)
  console.log(`Minted ${utils.formatEther(tokensForSale)} to ${saleCreator.address}`)
  // Approve saleLauncher by saleCreator
  await (await mesaToken.approve(mesa.saleLauncher.address, ethers.constants.MaxUint256)).wait(3)
  console.log(`Approved Mesa.SaleLauncher to spend $${await mesaToken.symbol()}`)
  // Use the last block timestamp to set startDate and endDate
  const lastBlock = await provider.getBlock(await provider.getBlockNumber())
  const startDate = lastBlock.timestamp + 180 // starts in 3 minutes from current block
  const endDate = startDate + 3600 * 72 // lasts for 72 hours
  // Start deploying the sale via the SDK
  console.log(`Launching new FixedPriceSale via MesaFactory`)
  // Create the sale
  const { fixedPriceSale, transactions } = await mesa.createFixedPriceSale(
    {
      maxCommitment: utils.parseEther('5'), // 5 WXDAI
      minCommitment: utils.parseEther('1'), // 1 WXDAI
      tokensForSale, // 50 FPST tokens for sale
      minRaise: utils.parseEther('30'), // 70% threshold
      tokenPrice: utils.parseEther('1'), // 2 WXDAI / 1 FPST
      tokenSupplier: saleCreator.address,
      tokenOut: mesaToken.address,
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
  console.log(fixedPriceSale.address)
  // Play with the FixedPriceSale
})()
