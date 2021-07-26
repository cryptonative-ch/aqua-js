"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeInitDataFixedPriceSale = exports.encodeInitDataFairSale = void 0;
const ethers_1 = require("ethers");
function encodeInitDataFairSale({ saleLauncher, saleTemplateId, tokenOut, tokenIn, auctionEndDate, tokenOutSupply, minPrice, minBuyAmount, minRaise, tokenSupplier, }) {
    return ethers_1.utils.defaultAbiCoder.encode(['address', 'uint256', 'address', 'address', 'uint256', 'uint256', 'uint96', 'uint96', 'uint256', 'address'], [
        saleLauncher,
        saleTemplateId,
        tokenOut,
        tokenIn,
        auctionEndDate,
        tokenOutSupply,
        minPrice,
        minBuyAmount,
        minRaise,
        tokenSupplier,
    ]);
}
exports.encodeInitDataFairSale = encodeInitDataFairSale;
function encodeInitDataFixedPriceSale({ saleLauncher, saleTemplateId, tokenSupplier, tokenIn, tokenOut, tokenPrice, tokensForSale, startDate, endDate, minCommitment, maxCommitment, minRaise, participantList, }) {
    return ethers_1.utils.defaultAbiCoder.encode([
        'address',
        'uint256',
        'address',
        'address',
        'address',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'bool',
    ], [
        saleLauncher,
        saleTemplateId,
        tokenSupplier,
        tokenIn,
        tokenOut,
        tokenPrice,
        tokensForSale,
        startDate,
        endDate,
        minCommitment,
        maxCommitment,
        minRaise,
        participantList,
    ]);
}
exports.encodeInitDataFixedPriceSale = encodeInitDataFixedPriceSale;
//# sourceMappingURL=encoders.js.map