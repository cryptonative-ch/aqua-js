import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
export type { TemplateLauncher } from './TemplateLauncher';
export type { SaleLauncher } from './SaleLauncher';
export type { AquaFactory } from './AquaFactory';
export type { FixedPriceSaleTemplate } from './FixedPriceSaleTemplate';
export type { FairSaleTemplate } from './FairSaleTemplate';
export type { FixedPriceSale } from './FixedPriceSale';
export type { FairSale } from './FairSale';
import type { TemplateLauncher as TemplateLauncherClass } from './TemplateLauncher';
import type { SaleLauncher as SaleLauncherClass } from './SaleLauncher';
import type { AquaFactory as AquaFactoryClass } from './AquaFactory';
import type { FixedPriceSaleTemplate as FixedPriceSaleTemplateClass } from './FixedPriceSaleTemplate';
import type { FairSaleTemplate as FairSaleTemplateClass } from './FairSaleTemplate';
import type { FixedPriceSale as FixedPriceSaleClass } from './FixedPriceSale';
import type { FairSale as FairSaleClass } from './FairSale';
export declare namespace Contracts {
    class AquaFactory {
        static connect(address: string, signerOrProvider: Signer | Provider): AquaFactoryClass;
    }
    class TemplateLauncher {
        static connect(address: string, signerOrProvider: Signer | Provider): TemplateLauncherClass;
    }
    class SaleLauncher {
        static connect(address: string, signerOrProvider: Signer | Provider): SaleLauncherClass;
    }
    class FixedPriceSale {
        static connect(address: string, signerOrProvider: Signer | Provider): FixedPriceSaleClass;
    }
    class FairSale {
        static connect(address: string, signerOrProvider: Signer | Provider): FairSaleClass;
    }
    class FairSaleTemplate {
        static connect(address: string, signerOrProvider: Signer | Provider): FairSaleTemplateClass;
    }
    class FixedPriceSaleTemplate {
        static connect(address: string, signerOrProvider: Signer | Provider): FixedPriceSaleTemplateClass;
    }
}
