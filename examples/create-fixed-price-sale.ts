import { JsonRpcProvider } from '@ethersproject/providers'
import { utils, ContractFactory, ethers } from 'ethers'

// Artifacts
import { abi, bytecode } from './artifacts/ERC20Mintable.json'
// MesaJS
import { Mesa, RINKEBY_CONFIG, XDAI_CONFIG } from '../src'
import { getWallets } from './helpers/wallet'
import { mnemonic } from '../secrets.json'
import { RINKEBY_INFURA_ENDPOINT, WXDAI_ADDRESS, XDAI_RPC_ENDPOINT } from './constants'
;(async () => {
  // Wrapped XDAI

  // Providers: XDAI and Rinkeby
  const xDaiProvider = new JsonRpcProvider(XDAI_RPC_ENDPOINT)
  const rinkebyProvider = new JsonRpcProvider(RINKEBY_INFURA_ENDPOINT)

  const provider = rinkebyProvider

  // Connecto xDAI
  const [saleCreator] = getWallets(mnemonic, provider)

  // Start Mesa instance
  const mesa = new Mesa(RINKEBY_CONFIG, saleCreator)
  const ERC20MintableFactory = new ContractFactory(abi, bytecode, saleCreator)
  // Deploy example tokens
  const mesaToken = await ERC20MintableFactory.deploy('Mesa', 'MESA')
  // total tokens for sale is 1000
  const tokensForSale = utils.parseEther('1000')
  // Mint tokensForSale to saleCreator
  await mesaToken.mint(saleCreator.address, tokensForSale)
  // Approve saleLauncher by saleCreator
  await mesaToken.approve(mesa.saleLauncher.address, ethers.constants.MaxUint256)
  // Use the last block timestamp to set startDate and endDate
  const lastBlock = await provider.getBlock(await provider.getBlockNumber())
  const startDate = lastBlock.timestamp + 3600 * 48 // starts in 24 hours from current block
  const endDate = startDate + 3600 * 72 // lasts for 72 hours

  // Create the sale
  const { fixedPriceSale, transactions } = await mesa.createFixedPriceSale({
    allocationMax: utils.parseEther('10'),
    allocationMin: utils.parseEther('1'),
    tokensForSale,
    minimumRaise: utils.parseEther('500'), // 70%
    tokenPrice: utils.parseEther('0.5'),
    tokenSupplier: saleCreator.address,
    tokenOut: mesaToken.address,
    tokenIn: WXDAI_ADDRESS,
    owner: saleCreator.address,
    startDate,
    endDate,
  })

  console.log(transactions)

  // Play with the FixedPriceSale
})()
