import { BigNumber, BigNumberish } from '@ethersproject/bignumber'

export interface InitDataFairSaleOptions {
  saleLauncher: string
  saleTemplateId: BigNumberish
  tokenOut: string
  tokenIn: string
  duration: BigNumberish
  tokensForSale: BigNumber
  minPrice: BigNumber
  minBuyAmount: BigNumber
  minRaise: BigNumber
  orderCancelationPeriodDuration: BigNumberish
  minimumBiddingAmountPerOrder: BigNumber
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
  minCommitment: BigNumberish
  maxCommitment: BigNumberish
  minRaise: BigNumberish
  participantList: boolean
}
