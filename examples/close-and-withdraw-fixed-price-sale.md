# Close and withdraw from a `FixedPrice` Sale

This example demonstrates how to close and withdraw funds from a `FixedPrice` Sale using the Mesa contracts on xDAI.

This example simply connects to the FixedPriceSale interface and interacts with it from there.

## Closing

The script first checks if the sale specified is closed or not.

If it is not then it will be closed as long as the threshold has been reached.

## Purchasers report

Calls xDai blockscout api to get all transactions from contract and displays them as urls to blockscout

## How to run create-fixed-price-sale.ts

Create ../secrets.json with a funded address mnemonic (Needs to have some xdai or base token of the target chain)

```
# echo '{ "mnemonic": "nix bla trash yield snuff trock switch roll noc toll trick lost"}' > ../secrets.json
# npx ts-node close-and-withdraw-fixed-price-sale.ts 0x........
```
