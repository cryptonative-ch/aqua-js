import { InitDataFairSaleOptions, InitDataFixedPriceSaleOptions } from './types/encoders';
export declare function encodeInitDataFairSale({ saleLauncher, saleTemplateId, tokenOut, tokenIn, auctionEndDate, tokenOutSupply, minPrice, minBuyAmount, minRaise, tokenSupplier, }: InitDataFairSaleOptions): string;
export declare function encodeInitDataFixedPriceSale({ saleLauncher, saleTemplateId, tokenSupplier, tokenIn, tokenOut, tokenPrice, tokensForSale, startDate, endDate, minCommitment, maxCommitment, minRaise, participantList, }: InitDataFixedPriceSaleOptions): string;
