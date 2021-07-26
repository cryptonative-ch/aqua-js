import type { Provider } from '@ethersproject/providers';
import type { Signer } from 'ethers';
import type { AquaFactory, SaleLauncher, TemplateLauncher } from '../contracts';
import type { Subgraph } from '../Subgraph';
export type { InitDataFairSaleOptions, InitDataFixedPriceSaleOptions } from './encoders';
export type { FixedPriceSaleOptions } from './sales';
export type { BooleanMap, DocumentTimestampFields, FixedPriceSaleBase, FixedPriceSalePopulated, FixedPriceSalePurchase, MesaFactory, SaleTemplate, Token, } from './subgraph';
export interface CreateInstanceOptions {
    factory: string;
    saleLauncher: string;
    templateLauncher: string;
    provider: Provider | Signer;
    subgraphEndpoint: string;
}
export interface MesaContracts {
    factory: AquaFactory;
    saleLauncher: SaleLauncher;
    templateLauncher: TemplateLauncher;
}
export interface AquaInstance<P = Provider | Signer> {
    contracts: MesaContracts;
    subgraph: Subgraph;
    provider: P;
}
export interface AddSaleOptions {
    mesa: AquaInstance;
    sale: string;
}
export interface AddTemplateOptions {
    mesa: AquaInstance;
    template: string;
}
export interface AquaConfigMap {
    factory: string;
    saleLauncher: string;
    templateLauncher: string;
    subgraph: string;
}
