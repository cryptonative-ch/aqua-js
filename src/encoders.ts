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
  auctionEndDate,
  tokenOutSupply,
  minPrice,
  minBuyAmount,
  minRaise,
  tokenSupplier,
}: InitDataFairSaleOptions): string {
  return utils.defaultAbiCoder.encode(
    ['address', 'uint256', 'address', 'address', 'uint256', 'uint256', 'uint96', 'uint96', 'uint256', 'address'],
    [
      saleLauncher,
      saleTemplateId,
      tokenOut,
      tokenIn,
      auctionEndDate,
      tokenOutSupply,
      minPrice,
      minBuyAmount,
      minRaise,
      tokenSupplier,
    ]
  )
}

export function encodeInitDataFixedPriceSale({
  saleLauncher,
  saleTemplateId,
  tokenSupplier,
  tokenOut,
  tokenIn,
  tokenPrice,
  tokensForSale,
  startDate,
  endDate,
  minCommitment,
  maxCommitment,
  minRaise,
  owner,
  participantList,
}: InitDataFixedPriceSaleOptions): string {
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
      'address',
    ],
    [
      saleLauncher,
      saleTemplateId,
      tokenSupplier,
      tokenOut,
      tokenIn,
      tokenPrice,
      tokensForSale,
      startDate,
      endDate,
      minCommitment,
      maxCommitment,
      minRaise,
      owner,
      participantList,
    ]
  )
}
