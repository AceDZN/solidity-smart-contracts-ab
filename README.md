# EDU - Education Coin ERC-20 contract

This project contains the solidity contract for the OpenCampus EDU Token.

## Audits

| Date       | Scope            | Commit                                                                                                                          | Auditor                                  | Report                                                       |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| 14/11/2022 | EDC ERC-20 Token | [6fd45c2db3a1e41113135151814bcbc9e618f1f0](https://github.com/tinytap/edc-smart-contract/blob/EDC-freeze/contracts/EDuCoin.sol) | [Solidified](https://www.solidified.io/) | [link](/audits/AuditReport-TinyTap_EDuCoin_[23.03.2023].pdf) |

## Solidity contracts

Only the contracts corresponding to the features developed for the current version of the module are present.

## Compilation artifacts

The compilation artifacts, including the debug information, are available in the `artifacts` folder, both in the git repository and the release packages.
The artifacts for the previous versions of the module are also available in the `artifacts_previous` folder. These artifacts can be imported in dependents projects and used in tests or migration scripts with the following hardhat configuration:
`./hardhat-config/external.config.js`

```javascript
module.exports = {
  external: {
    contracts: [
      {
        artifacts: './node_modules/@animoca/ethereum-contracts/artifacts',
      },
    ],
  },
}
```

## Development

Install the dependencies:

#### Installation

```bash
yarn install
```

or

```bash
npm install
```

#### Compile the contract:

```bash
yarn compile
```

#### Run the tests coverage:

```bash
yarn test
```

- If you see the following warning
  > Warning: Contract code size is 24622 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.
  - You need to reduce the optimizer runs count (`hardhat-config/settings.config.js`):
    ```bash
    settings: {
            optimizer: {
            enabled: true,
            runs: 200,
            },
        },
    ```

### Deploy Contract

#### TestNet:

_BSCtestnet:_ `yarn deploy:bscTestnet`

_Goerli:_ `yarn deploy:goerli`

#### MainNet:

_BSC:_
`yarn deploy:bsc`

_Ethereum:_
`yarn deploy:mainnet`

### Verify Contract

#### TestNet:

_BSCtestnet:_ `yarn verify:bscTestnet {{address}}`

_Goerli:_ `yarn verify:goerli {{address}}`

#### MainNet:

_BSC:_ `yarn verify:bsc {{address}}`

_Ethereum:_ `yarn verify:mainnet {{address}}`

\_

_See `package.json` for additional commands._

