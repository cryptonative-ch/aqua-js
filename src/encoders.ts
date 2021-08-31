// Externals
import { utils } from 'ethers'
// Interfaces
import { InitDataFairSaleOptions, InitDataFixedPriceSaleOptions } from './types/encoders'

/**
 * Encodes
 */
export function encodeInitDataFairSale({
  saleLauncher,
  saleTemplateId,
  tokenOut,
  tokenIn,
  auctionStartDate,
  auctionEndDate,
  tokensForSale,
  minPrice,
  minBuyAmount,
  minRaise,
  orderCancelationPeriodDuration,
  minimumBiddingAmountPerOrder,
  tokenSupplier,
}: InitDataFairSaleOptions) {
  return utils.defaultAbiCoder.encode(
    [
      'address',
      'uint256',
      'address',
      'address',
      'uint256',
      'uint256',
      'uint256',
      'uint96',
      'uint96',
      'uint256',
      'uint256',
      'uint256',
      'address',
    ],
    [
      saleLauncher,
      saleTemplateId,
      tokenIn,
      tokenOut,
      auctionStartDate,
      auctionEndDate,
      tokensForSale,
      minPrice,
      minBuyAmount,
      minRaise,
      orderCancelationPeriodDuration,
      minimumBiddingAmountPerOrder,
      tokenSupplier,
    ]
  )
}

export function encodeInitDataFixedPriceSale({
  saleLauncher,
  saleTemplateId,
  tokenSupplier,
  tokenIn,
  tokenOut,
  tokenPrice,
  tokensForSale,
  startDate,
  endDate,
  minCommitment,
  maxCommitment,
  minRaise,
  participantList,
}: InitDataFixedPriceSaleOptions) {
  return utils.defaultAbiCoder.encode(
    [
      'address',
      'uint256',
      'address',
      'address',
      'address',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'bool',
    ],
    [
      saleLauncher,
      saleTemplateId,
      tokenSupplier,
      tokenIn,
      tokenOut,
      tokenPrice,
      tokensForSale,
      startDate,
      endDate,
      minCommitment,
      maxCommitment,
      minRaise,
      participantList,
    ]
  )
}
