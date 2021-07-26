"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedPriceSaleTemplateABI = void 0;
exports.FixedPriceSaleTemplateABI = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'tokenOut',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'tokensForSale',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint96',
                name: 'minPrice',
                type: 'uint96',
            },
            {
                indexed: false,
                internalType: 'uint96',
                name: 'minBuyAmount',
                type: 'uint96',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'minRaise',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'orderCancelationPeriodDuration',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'minimumBiddingAmountPerOrder',
                type: 'uint256',
            },
        ],
        name: 'TemplateInitialized',
        type: 'event',
    },
    {
        inputs: [],
        name: 'aquaFactory',
        outputs: [
            {
                internalType: 'contract IAquaFactory',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'createSale',
        outputs: [
            {
                internalType: 'address',
                name: 'newSale',
                type: 'address',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'encodedInitData',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: '_data',
                type: 'bytes',
            },
        ],
        name: 'init',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'isInitialized',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'isSaleCreated',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'metaDataContentHash',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'saleLauncher',
        outputs: [
            {
                internalType: 'contract ISaleLauncher',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'saleTemplateId',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'templateName',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'tokenOut',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'tokenSupplier',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'tokensForSale',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
//# sourceMappingURL=FixedPriceSaleTemplate.js.map