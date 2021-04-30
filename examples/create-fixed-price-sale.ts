import { JsonRpcProvider } from '@ethersproject/providers'
import { utils, Wallet, ContractFactory, ethers } from 'ethers'

import { getWallets } from './helpers/wallet'

import { abi, bytecode } from './artifacts/ERC20Mintable.json'
import { Mesa, RINKEBY_CONFIG, XDAI_CONFIG } from '../src'
import { mnemonic } from '../secrets.json'
;(async () => {
  const WXDAI_TOKEN = '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'
  const ADM_TOKEN = '0x1716f4bb1D32500cDd897ee88a61bb78B003FBd3'

  const xDaiProvider = new JsonRpcProvider('https://rpc.xdaichain.com/')
  const rinkebyProvider = new JsonRpcProvider('https://rinkeby.infura.io/v3/e1a3bfc40093494ca4f36b286ab36f2d')

  const provider = rinkebyProvider

  // Connecto xDAI
  const [saleCreator] = getWallets(mnemonic, provider)

  // Start Mesa instance
  const mesa = new Mesa(RINKEBY_CONFIG, saleCreator)

  // Approve saleLauncher by saleCreator

  const ERC20MintableFactory = new ContractFactory(abi, bytecode, saleCreator)
  const adamToken = await ERC20MintableFactory.attach(ADM_TOKEN)
  await adamToken.approve(mesa.saleLauncher.address, ethers.constants.MaxUint256)
  // total tokens for sale is 1000
  const tokensForSale = utils.parseEther('1000')
  // Mint tokensForSale to saleCreator
  // await adamToken.mint(saleCreator.address, tokensForSale)
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
    tokenOut: ADM_TOKEN,
    tokenIn: WXDAI_TOKEN,
    owner: saleCreator.address,
    startDate,
    endDate,
  })

  console.log(transactions)
})()
