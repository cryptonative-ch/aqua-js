import { BigNumber } from '@ethersproject/bignumber';
export declare type BooleanMap<T = any> = {
    [key in keyof T]: boolean;
};
export interface DocumentTimestampFields {
    createdAt: number;
    updatedAt: number;
    deletedAt: number | null;
}
interface SubgraphSchema {
    [key: string]: any;
}
export interface MesaFactory extends SubgraphSchema {
    id: string;
    saleCount: number;
    address: string;
    feeManager: string;
    feeTo: string;
    templateManager: string;
    templateLauncher: string;
    saleFee: BigNumber;
    feeNumerator: BigNumber;
    templateFee: BigNumber;
}
export interface SaleTemplate extends SubgraphSchema, DocumentTimestampFields {
    id: number;
    address: string;
    factory: string;
    name: string;
    verified: boolean;
}
export interface Token extends SubgraphSchema, DocumentTimestampFields {
    id: string;
    name: String;
    symbol: String;
    decimals: number;
}
export interface FixedPriceSaleBase<TokenType = string> extends SubgraphSchema, DocumentTimestampFields {
    id: string;
    name: string;
    status: string;
    startDate: number;
    endDate: number;
    sellAmount: BigNumber;
    minimumRaise: BigNumber;
    allocationMin: BigNumber;
    allocationMax: BigNumber;
    tokenIn: TokenType;
    tokenOut: TokenType;
    purchases: FixedPriceSalePurchase[];
}
export interface FixedPriceSalePopulated extends FixedPriceSaleBase<Token> {
}
export interface FixedPriceSalePurchase extends SubgraphSchema, DocumentTimestampFields {
    sale: string;
    buyer: string;
    amount: BigNumber;
}
export {};
