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
