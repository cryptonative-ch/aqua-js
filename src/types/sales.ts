import { InitDataFixedPriceSaleOptions } from './encoders'

/**
 * Builds FixedPriceSaleOptions from the encoder data by excluding saleLauncher and saleTemplateId fields
 */
export type FixedPriceSaleOptions = Pick<
  InitDataFixedPriceSaleOptions,
  Exclude<keyof InitDataFixedPriceSaleOptions, 'saleLauncher' | 'saleTemplateId'>
>
