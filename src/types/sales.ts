import { InitDataFixedPriceSaleOptions, InitDataFairSaleOptions } from './encoders'

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
