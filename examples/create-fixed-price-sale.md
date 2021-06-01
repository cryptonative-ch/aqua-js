# Create a `FixedPrice` Sale

This example demonstrates how to create a `FixedPrice` Sale using the Mesa contracts on xDAI.

Creating a Sale using Mesa contract always involves two major transaction:

1. Launch a Sale Template from the `MesaFactory`.
2. Launch the Sale from the `SaleTemplate`.

## Launch a SaleTemplate via the `MesaFactory`

To launch a `SaleTemplate`, call `MesaFactory.launchTemplate`

| Name          | Description                                    |
| ------------- | ---------------------------------------------- |
| `_templateId` | The sale template Id                           |
| `_data`       | Sale data as a Bytes string. See below section |

### Encoding Sale data

Sale data `_data` has to be encoded an Bytes string. You can use `encodeInitDataFixedPriceSale` from the encoders to do this. The default example uses these parameters below.

| Name            | Description                                        | Value                                                                                                               |
| --------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `allocationMax` | Maximum number of token allocated to each investor | 5                                                                                                                   |
| `allocationMin` | Minimum number of token allocated to each investor | 1                                                                                                                   |
| `tokensForSale` | Number of tokens on Sale                           | 50                                                                                                                  |
| `minimumRaise`  | Number of tokens to raise                          | 30 (60%)                                                                                                            |
| `tokenPrice`    | Token price                                        | 0.5                                                                                                                 |
| `tokenSupplier` | Address of token supplier                          | `saleCreator`                                                                                                       |
| `tokenOut`      | Address of sale token                              | Mesa                                                                                                                |
| `tokenIn`       | Address of token used to buy `tokeOut`             | [Wrapped xDAI](https://blockscout.com/xdai/mainnet/address/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d/transactions) |
| `owner`         | Address of Sale owner of the sale                  | `saleCreator`                                                                                                       |
| `startDate`     | Unix timestamp at which the Sale opens             | Current block timestamp + 3 minutes                                                                                 |
| `endDate`       | Unix timestamp at the Sale closes                  | Current block timestamp + 72 hours                                                                                  |

### Approve `SaleLauncher` to Spend the Sale Token

A Sale token is the token the Sale creator wishes to sell to potentials investors. When a Sale is created, the Sale tokens are transfered to Sale contract. Tokens are then either distrbuted among investors (claimed) or returned to the Sale creators address should the sale fail to reach its threshold.

## Launch the Sale from the `SaleLauncher`

After the template is deployed, connect to it and call `createSale`. This transaction requires sending the `saleFee` as value (the native currency of the network).

## Use The SDK

The SDK combines all this into a single method `Mesa.createFixedPriceSale`. See [example](./create-fixed-price-sale.ts)

## How to run create-fixed-price-sale.ts

1. Edit create-fixed-price-sale.ts with your desired properties
2. create ../secrets.json with a funded address mnemonic (Needs to have some xdai or base token of the target chain)

```
# echo '{ "mnemonic": "nix bla trash yield snuff trock switch roll noc toll trick lost"}' > ../secrets.json
# npx ts-node create-fixed-price-sale.ts
```

3. Output of a successful created sale

```
Deployed FPST 2 at 0x310c95Fd16094793666f17e32C94887cA3504D68
Minted 50.0 to 0x6F736630D86FE714E8Ce02c68f431347789F9835
Approved Mesa.SaleLauncher to spend $FPST 2
Launching new FixedPriceSale via MesaFactory
[
  {
    nonce: 93,
    gasPrice: BigNumber { _hex: '0x04a817c800', _isBigNumber: true },
    gasLimit: BigNumber { _hex: '0x085042', _isBigNumber: true },
    to: '0xefb5490683bE4AE8de4bFB05a84Ef0F79d9DC2db',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    data: '0x41a7ab1b0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000646219eae83ed7dff641332b36402350fa9a0cda00000000000000000000000000000000000000000000000000000000000000020000000000000000000000006f736630d86fe714e8ce02c68f431347789f9835000000000000000000000000310c95fd16094793666f17e32c94887ca3504d68000000000000000000000000e91d153e0b41518a2ce8dd3d7944fa863463a97d00000000000000000000000000000000000000000000000006f05b59d3b20000000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000000000000060b616780000000000000000000000000000000000000000000000000000000060bdff780000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000004563918244f400000000000000000000000000000000000000000000000000008ac7230489e800000000000000000000000000006f736630d86fe714e8ce02c68f431347789f9835',
    chainId: 100,
    v: 236,
    r: '0xc640f977c236da63172a5810650613fcadffcb4afe8ae836f1edb7f02b0eb17d',
    s: '0x1e0343f6af18253fa1a6792fdcad40c685209a6a44801ea232ece4f15727e35a',
    from: '0x6F736630D86FE714E8Ce02c68f431347789F9835',
    hash: '0x55fd5476ea9b22f921581e862175a5e3bc5f423e307176a21b36721348486c22',
    type: null,
    wait: [Function (anonymous)]
  },
  {
    nonce: 94,
    gasPrice: BigNumber { _hex: '0x04a817c800', _isBigNumber: true },
    gasLimit: BigNumber { _hex: '0x08ee22', _isBigNumber: true },
    to: '0x593417a677e7CFb17a8446524967f55d29329E2C',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    data: '0x906652be',
    chainId: 100,
    v: 236,
    r: '0xe48e489fe7e9b397f5b0cf2cf2bc3f2439c71faa394a429d0b68458cb9b005ef',
    s: '0x5782a807c863b3e897759caf47345404cadde1cdfffd39b839d920ea9d85c136',
    from: '0x6F736630D86FE714E8Ce02c68f431347789F9835',
    hash: '0xba4bf2a8a1abc37d9104ae59035401d808a2790245c90c7435db7cd2e1e072a1',
    type: null,
    wait: [Function (anonymous)]
  }
]
```

4. Enjoy your token sale

![Screenshot at 2021-06-01 13-19-23](https://user-images.githubusercontent.com/918180/120316048-48362100-c2dd-11eb-84f2-5c379eded151.png)


5. Revert change in create-fixed-price-sale.ts, with `git checkout create-fixed-price-sale.ts`
