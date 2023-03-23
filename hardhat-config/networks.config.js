const os = require('os').homedir()
const { mnemonic } = require(os + '/.mnemonics')
module.exports = {
  defaultNetwork: "bscTestnet",
  networks: {
    hardhat: {
      gas: 19000000,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      accounts: { mnemonic },
    },

    mainnet: {
      url: process.env.PROVIDER_URL_INFURA_MAINNET,
      chainId: 1,
      gasPrice: 'auto',
      tags: ['production'],
      accounts: { mnemonic },
    },
    polygon: {
      url: process.env.PROVIDER_URL_INFURA_MATIC,
      chainId: 137,
      gasPrice: 'auto',
      tags: ['production'],
      accounts: { mnemonic },
    },
    goerli: {
      url: process.env.PROVIDER_URL_INFURA_GOERLI,
      chainId: 5,
      gasPrice: 'auto',
      tags: ['testnet'],
      accounts: { mnemonic },
    },
    mumbai: {
      url: process.env.PROVIDER_URL_INFURA_MUMBAI,
      chainId: 80001,
      gasPrice: 'auto',
      tags: ['testnet'],
      accounts: { mnemonic },
    },
    bsc: {
      url: process.env.PROVIDER_URL_INFURA_BSC_MAINNET,
      chainId: 56,
      gasPrice: 'auto',
      tags: ['production'],
      accounts: { mnemonic },
    },
    bscTestnet: {
      url: process.env.PROVIDER_URL_INFURA_BSC_TESTNET,
      chainId: 97,
      gasPrice: 'auto',
      tags: ['testnet'],
      accounts: { mnemonic },
    },
  },
}

