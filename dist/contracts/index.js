"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contracts = void 0;
const ethers_1 = require("ethers");
const TemplateLauncher_1 = require("./abis/TemplateLauncher");
const SaleLauncher_1 = require("./abis/SaleLauncher");
const AquaFactory_1 = require("./abis/AquaFactory");
const FixedPriceSaleTemplate_1 = require("./abis/FixedPriceSaleTemplate");
const FairSaleTemplate_1 = require("./abis/FairSaleTemplate");
const FixedPriceSale_1 = require("./abis/FixedPriceSale");
const FairSale_1 = require("./abis/FairSale");
var Contracts;
(function (Contracts) {
    class AquaFactory {
        static connect(address, signerOrProvider) {
            return new ethers_1.Contract(address, AquaFactory_1.AquaFactoryABI, signerOrProvider);
        }
    }
    Contracts.AquaFactory = AquaFactory;
    class TemplateLauncher {
        static connect(address, signerOrProvider) {
            return new ethers_1.Contract(address, TemplateLauncher_1.TemplateLauncherABI, signerOrProvider);
        }
    }
    Contracts.TemplateLauncher = TemplateLauncher;
    class SaleLauncher {
        static connect(address, signerOrProvider) {
            return new ethers_1.Contract(address, SaleLauncher_1.SaleLauncherABI, signerOrProvider);
        }
    }
    Contracts.SaleLauncher = SaleLauncher;
    class FixedPriceSale {
        static connect(address, signerOrProvider) {
            return new ethers_1.Contract(address, FixedPriceSale_1.FixedPriceSaleABI, signerOrProvider);
        }
    }
    Contracts.FixedPriceSale = FixedPriceSale;
    class FairSale {
        static connect(address, signerOrProvider) {
            return new ethers_1.Contract(address, FairSale_1.FairSaleABI, signerOrProvider);
        }
    }
    Contracts.FairSale = FairSale;
    class FairSaleTemplate {
        static connect(address, signerOrProvider) {
            return new ethers_1.Contract(address, FairSaleTemplate_1.FairSaleTemplateABI, signerOrProvider);
        }
    }
    Contracts.FairSaleTemplate = FairSaleTemplate;
    class FixedPriceSaleTemplate {
        static connect(address, signerOrProvider) {
            return new ethers_1.Contract(address, FixedPriceSaleTemplate_1.FixedPriceSaleTemplateABI, signerOrProvider);
        }
    }
    Contracts.FixedPriceSaleTemplate = FixedPriceSaleTemplate;
})(Contracts = exports.Contracts || (exports.Contracts = {}));
//# sourceMappingURL=index.js.map