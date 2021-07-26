import { InitDataFixedPriceSaleOptions } from './encoders';
export declare type FixedPriceSaleOptions = Pick<InitDataFixedPriceSaleOptions, Exclude<keyof InitDataFixedPriceSaleOptions, 'saleLauncher' | 'saleTemplateId'>>;
