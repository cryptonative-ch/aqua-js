# Close and withdraw from a `FixedPrice` Sale

This example demonstrates how to close and withdraw funds from a `FixedPrice` Sale using the Mesa contracts on xDAI.

This example simply connects to the FixedPriceSale interface and interacts with it from there.

## Closing

The script first checks if the sale specified is closed or not.

If it is not then it will be closed as long as the threshold has been reached.

## Purchasers report

THere is supposed to be an output of all addresses and how many tokens they purchased, but it currently has bugs and so should not be relied on (unless no).

In future, more view methods should be added to contracts to allow for easier reporting (returning full array of addresses, etc).

## How to run create-fixed-price-sale.ts

Create ../secrets.json with a funded address mnemonic (Needs to have some xdai or base token of the target chain)

```
# echo '{ "mnemonic": "nix bla trash yield snuff trock switch roll noc toll trick lost"}' > ../secrets.json
# npx ts-node close-and-withdraw-fixed-price-sale.ts 0x........
```
