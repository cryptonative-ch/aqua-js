import { InitDataFixedPriceSaleOptions, InitDataFairSaleOptions } from '@dxdao/aqua-sc'

/**
 * Builds FixedPriceSaleOptions from the encoder data by excluding saleLauncher and saleTemplateId fields
 */
export type FixedPriceSaleOptions = Pick<
  InitDataFixedPriceSaleOptions,
  Exclude<keyof InitDataFixedPriceSaleOptions, 'saleLauncher' | 'saleTemplateId'>
>

export type FairPriceSaleOptions = Pick<
  InitDataFairSaleOptions,
  Exclude<keyof InitDataFairSaleOptions, 'saleLauncher' | 'saleTemplateId'>
>
