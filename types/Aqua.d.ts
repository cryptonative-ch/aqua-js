import { ContractReceipt, ContractTransaction } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { AquaFactory, FixedPriceSale, SaleLauncher, TemplateLauncher } from './contracts';
import { Subgraph } from './Subgraph';
import { FixedPriceSaleOptions, AquaConfigMap } from './types';
interface AquaContracts {
    factory: AquaFactory;
    saleLauncher: SaleLauncher;
    templateLauncher: TemplateLauncher;
}
export declare class Aqua {
    readonly factory: AquaFactory;
    readonly saleLauncher: SaleLauncher;
    readonly templateLauncher: TemplateLauncher;
    readonly subgraph: Subgraph;
    readonly provider: Signer | Provider;
    constructor({ factory, saleLauncher, templateLauncher, subgraph }: AquaConfigMap, signerOrProvider: Signer | Provider);
    contracts(): AquaContracts;
    addSaleModule(saleAddress: string): Promise<ContractReceipt>;
    addSaleTemplate(saleTemplateAddress: string): Promise<ContractReceipt>;
    createFixedPriceSale(saleOptions: FixedPriceSaleOptions, metaData: string): Promise<{
        fixedPriceSale: FixedPriceSale;
        transactions: ContractTransaction[];
    }>;
    getLaunchedTemplateAddress(transctionReceipt: ContractReceipt): string;
}
export {};
