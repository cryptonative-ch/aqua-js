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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subgraph = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const axios_1 = __importDefault(require("axios"));
class Subgraph {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.post(this.endpoint, {
                query,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return res.data;
        });
    }
    getMesaFactory(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.query(`{
      mesaFactory (id: "${Subgraph.MESA_FACTORY_ID}") {
        ${fields || Object.keys(Subgraph.MESA_FACTORY_FIELDS).join(', ')}
      }
    }`);
            const mesaFactory = Object.entries(data.mesaFactory).reduce((acc, [key, value]) => {
                const fixedValue = this.mapBigDecimalToBigNumber(Subgraph.MESA_FACTORY_FIELDS, [key, value]);
                acc[key] = fixedValue;
                return acc;
            }, {});
            return mesaFactory;
        });
    }
    getFixedPriceSales(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.query(`{
      fixedPriceSales {
        ${fields || Object.keys(Subgraph.FIXED_PRICE_SALE_FIELDS).join(', ')}
      }
    }`);
            const fixedPriceSales = data.fixedPriceSales.map(fixedPriceSale => {
                return Object.entries(fixedPriceSale).reduce((acc, [key, value]) => {
                    const fixedValue = this.mapBigDecimalToBigNumber(Subgraph.FIXED_PRICE_SALE_FIELDS, value);
                    acc[key] = fixedValue;
                    return acc;
                }, {});
            });
            return fixedPriceSales;
        });
    }
    getFixedPriceSaleByAddress(address, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.query(`{
      fixedPriceSale (id: "${address}") {
        ${fields || Object.keys(Subgraph.FIXED_PRICE_SALE_FIELDS).join(', ')}
      }
    }`);
            return Object.entries(data.fixedPriceSale).reduce((acc, [key, value]) => {
                const fixedValue = this.mapBigDecimalToBigNumber(Subgraph.FIXED_PRICE_SALE_FIELDS, value);
                acc[key] = fixedValue;
                return acc;
            }, {});
        });
    }
    getSaleTemplates(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.query(`{
      saleTemplates {
        ${fields || Object.keys(Subgraph.SALE_TEMPLATE_FIELDS).join(', ')}
      }
    }`);
            return data.saleTemplates;
        });
    }
    getSaleTemplateById(id, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.query(`{
      saleTemplate (id: "${id}") {
        ${fields || Object.keys(Subgraph.SALE_TEMPLATE_FIELDS).join(', ')}
      }
    }`);
            return data.saleTemplate;
        });
    }
    mapBigDecimalToBigNumber(schema, [key, value]) {
        if (schema[key] === bignumber_1.BigNumber) {
            return bignumber_1.BigNumber.from(value);
        }
        return value;
    }
    mapBigDecimalToBigNumberRecursive(schema, [key, value]) {
        if (schema.key && schema[key] === bignumber_1.BigNumber) {
            return bignumber_1.BigNumber.from(value);
        }
        return value;
    }
}
exports.Subgraph = Subgraph;
Subgraph.MESA_FACTORY_ID = 'MesaFactory';
Subgraph.MESA_FACTORY_FIELDS = {
    id: String,
    saleCount: Number,
    address: String,
    feeManager: String,
    feeTo: String,
    templateManager: String,
    templateLauncher: String,
    saleFee: bignumber_1.BigNumber,
    feeNumerator: bignumber_1.BigNumber,
    templateFee: bignumber_1.BigNumber,
};
Subgraph.SALE_TEMPLATE_FIELDS = {
    id: Number,
    createdAt: Number,
    updatedAt: Number,
    deletedAt: Number,
    address: String,
    factory: String,
    name: String,
    verified: Boolean,
};
Subgraph.FIXED_PRICE_SALE_FIELDS = {
    id: Number,
    createdAt: Number,
    updatedAt: Number,
    deletedAt: Number,
    name: String,
};
Subgraph.FIXED_PRICE_SALE_PURCHASE_FIELDS = {
    amount: bignumber_1.BigNumber,
    buyer: String,
};
//# sourceMappingURL=Subgraph.js.map