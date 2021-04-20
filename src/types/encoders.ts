import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

export interface InitDataFairSaleOptions {
  saleLauncher: string
  saleTemplateId: BigNumberish
  tokenOut: string
  tokenIn: string
  duration: BigNumberish
  tokenOutSupply: BigNumberish
  minPrice: BigNumber
  minBuyAmount: BigNumber
  minRaise: BigNumber
  tokenSupplier: string
}

export interface InitDataFixedPriceSaleOptions {
  saleLauncher: string
  saleTemplateId: BigNumberish
  tokenSupplier: string
  tokenOut: string
  tokenIn: string
  tokenPrice: BigNumberish
  tokensForSale: BigNumberish
  startDate: BigNumberish
  endDate: BigNumberish
  allocationMin: BigNumberish
  allocationMax: BigNumberish
  minimumRaise: BigNumberish
  owner: string
}
