# Overview
There are 3 main components:

1. Mesa class. Creates a instance that allows developer to create sales, add sale modules and add templates. Exposes the three main contracts: MesaFactory, SaleLauncher and TemplateLauncher
2. Subgraph class. Accepts the graphqhl endpoint and offers methods to read from the Subgraph.
3. Sales module. Exports helper functions to interact with Mesa Sales

Others:

4. Exports xDai and Rinkeby networks config.
5. Exports ABI encoders
6. Exports types


# Examples

This library is used to start a new sale over cli, see [create-fixed-price-sale.md](/examples/create-fixed-price-sale.md) and [examples](/examples/) folder in general
