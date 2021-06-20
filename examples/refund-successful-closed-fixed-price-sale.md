# Refund a closed `FixedPrice` Sale

This example demonstrates how to refund a `FixedPrice` Sale using the Mesa contracts on xDAI.

This only works if a sale is successful and has been closed.

Before running this please run the close-and-withdraw-fixed-price-sale.ts script for the sale.

> **WARNING - This script automatically send funds to addresses**: Make sure you have closed and withdrawn sale and are certain this should be done!

Steps:

1. Get all transactions for associated contract via blockscout API
2. Construct map of purchasers and amount of tokens bought
3. Calculate cost in WXDAI
4. Send WXDAI back to purchaser address

## Limitations

There are some issues with this to bear in mind:

1. If a user has withdrawn their tokens they cannot be refunded
2. Sale must be closed and preferably withdrawn (refer to close-and-withdraw-fixed-price-sale script)
3. Currently the script assumes that tokensPurchased mapping is denominated in tokenOut as this is how the contract currently works (however this is subject to change with future versions)

## How to run refund-fixed-price-sale.ts

Create ../secrets.json with a funded address mnemonic (Needs to have some xdai or base token of the target chain)

```
# echo '{ "mnemonic": "nix bla trash yield snuff trock switch roll noc toll trick lost"}' > ../secrets.json
# npx ts-node refund-fixed-price-sale.ts 0x........
```
