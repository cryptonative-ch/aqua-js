import { BigNumber } from '@ethersproject/bignumber';
import { FixedPriceSaleBase, MesaFactory, SaleTemplate } from './types/subgraph';
interface SubgraphResponse<T = any> {
    data: {
        [name: string]: T;
    };
}
declare type KeyValuePair = [key: string, value: any];
interface SubgraphSchemaFieldTypes {
    [key: string]: typeof BigNumber | NumberConstructor | StringConstructor | BooleanConstructor;
}
export declare class Subgraph {
    private endpoint;
    static MESA_FACTORY_ID: string;
    static MESA_FACTORY_FIELDS: SubgraphSchemaFieldTypes;
    static SALE_TEMPLATE_FIELDS: SubgraphSchemaFieldTypes;
    static FIXED_PRICE_SALE_FIELDS: SubgraphSchemaFieldTypes;
    static FIXED_PRICE_SALE_PURCHASE_FIELDS: SubgraphSchemaFieldTypes;
    constructor(endpoint: string);
    query<T = any, R = SubgraphResponse<T>>(query: string): Promise<R>;
    getMesaFactory(fields?: string): Promise<MesaFactory>;
    getFixedPriceSales(fields?: string): Promise<FixedPriceSaleBase[]>;
    getFixedPriceSaleByAddress(address: string, fields?: string): Promise<FixedPriceSaleBase>;
    getSaleTemplates(fields?: string): Promise<SaleTemplate[]>;
    getSaleTemplateById(id: string, fields?: string): Promise<SaleTemplate>;
    mapBigDecimalToBigNumber(schema: SubgraphSchemaFieldTypes, [key, value]: KeyValuePair): string | number | BigNumber;
    mapBigDecimalToBigNumberRecursive(schema: SubgraphSchemaFieldTypes, [key, value]: KeyValuePair): string | number | BigNumber;
}
export {};
