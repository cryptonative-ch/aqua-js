import { InitDataFixedPriceSaleOptions, InitDataFairSaleOptions } from './encoders'

/**
 * Builds FixedPriceSaleOptions from the encoder data by excluding saleLauncher and saleTemplateId fields
 */
export type FixedPriceSaleOptions = Pick<
  InitDataFixedPriceSaleOptions,
  Exclude<keyof InitDataFixedPriceSaleOptions, 'saleLauncher' | 'saleTemplateId'>
>

/**
 * Builds FairSaleOptions from the encoder data by excluding saleLauncher and saleTemplateId fields
 */
export type FairSaleOptions = Pick<
  InitDataFairSaleOptions,
  Exclude<keyof InitDataFairSaleOptions, 'saleLauncher' | 'saleTemplateId'>
>
