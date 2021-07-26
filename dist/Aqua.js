"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aqua = void 0;
const contracts_1 = require("./contracts");
const encoders_1 = require("./encoders");
const errors_1 = require("./errors");
const Subgraph_1 = require("./Subgraph");
class Aqua {
    constructor({ factory, saleLauncher, templateLauncher, subgraph }, signerOrProvider) {
        this.factory = contracts_1.Contracts.AquaFactory.connect(factory, signerOrProvider);
        this.saleLauncher = contracts_1.Contracts.SaleLauncher.connect(saleLauncher, signerOrProvider);
        this.templateLauncher = contracts_1.Contracts.TemplateLauncher.connect(templateLauncher, signerOrProvider);
        this.subgraph = new Subgraph_1.Subgraph(subgraph);
        this.provider = signerOrProvider;
    }
    contracts() {
        return {
            factory: this.factory,
            saleLauncher: this.saleLauncher,
            templateLauncher: this.templateLauncher,
        };
    }
    addSaleModule(saleAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const addTemplateTx = yield this.saleLauncher.addTemplate(saleAddress);
            const addTemplateTxReceipt = addTemplateTx.wait(1);
            return addTemplateTxReceipt;
        });
    }
    addSaleTemplate(saleTemplateAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const addTemplateTx = yield this.templateLauncher.addTemplate(saleTemplateAddress);
            const addTemplateTxReceipt = yield addTemplateTx.wait(1);
            return addTemplateTxReceipt;
        });
    }
    createFixedPriceSale(saleOptions, metaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = [];
            const saleTemplates = yield this.subgraph.getSaleTemplates();
            const fixedPriceSaleTemplate = saleTemplates.find(({ name }) => name == 'FixedPriceSaleTemplate');
            if (!fixedPriceSaleTemplate) {
                throw new errors_1.SaleTemplateNotRegistered('Mesa: FixedPriceSaleTemplate is not registered');
            }
            const saleOptionsInitDataBytes = encoders_1.encodeInitDataFixedPriceSale(Object.assign(Object.assign({}, saleOptions), { saleLauncher: this.saleLauncher.address, saleTemplateId: fixedPriceSaleTemplate.id }));
            const launchTemplateTx = yield this.factory.launchTemplate(fixedPriceSaleTemplate.id, saleOptionsInitDataBytes, metaData);
            transactions.push(launchTemplateTx);
            const launchTemplateTxRecipt = yield launchTemplateTx.wait(2);
            const templateAddress = this.getLaunchedTemplateAddress(launchTemplateTxRecipt);
            const saleTemplate = contracts_1.Contracts.FixedPriceSaleTemplate.connect(templateAddress, this.provider);
            const createSaleTx = yield saleTemplate.createSale({
                value: yield this.factory.saleFee(),
            });
            transactions.push(createSaleTx);
            const createSaleTxReceipt = yield createSaleTx.wait(3);
            const newSaleAddress = `0x${createSaleTxReceipt.logs[0].topics[1].substring(26)}`;
            return {
                fixedPriceSale: contracts_1.Contracts.FixedPriceSale.connect(newSaleAddress, this.provider),
                transactions,
            };
        });
    }
    getLaunchedTemplateAddress(transctionReceipt) {
        if (!transctionReceipt.events) {
            throw new errors_1.AquaError('Transction did not emit any event');
        }
        const eventTemplateLaunched = transctionReceipt.events.find(event => event.event === this.factory.interface.events['TemplateLaunched(address,uint256)'].name);
        if (!eventTemplateLaunched || !eventTemplateLaunched.args) {
            throw new errors_1.AquaError('Transction did not emit any event TemplateLaunched');
        }
        return eventTemplateLaunched.args.template;
    }
}
exports.Aqua = Aqua;
//# sourceMappingURL=Aqua.js.map