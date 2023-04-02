const os = require('os').homedir()
//const { mnemonic } = require(os + '/.mnemonics')
module.exports = {
  defaultNetwork: 'bscTestnet',
  networks: {
    hardhat: {
      gas: 19000000,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      tags: ['testnet', 'hardhat'],
    },
    mainnet: {
      url: process.env.PROVIDER_URL_INFURA_MAINNET,
      chainId: 1,
      gasPrice: 'auto',
      tags: ['production', 'ethereum'],
    },
    goerli: {
      url: process.env.PROVIDER_URL_INFURA_GOERLI,
      chainId: 5,
      gasPrice: 'auto',
      tags: ['testnet', 'ethereum'],
    },
    polygon: {
      url: process.env.PROVIDER_URL_INFURA_MATIC,
      chainId: 137,
      gasPrice: 'auto',
      tags: ['production', 'polygon'],
    },
    mumbai: {
      url: process.env.PROVIDER_URL_INFURA_MUMBAI,
      chainId: 80001,
      gasPrice: 'auto',
      tags: ['testnet', 'polygon'],
    },
    bsc: {
      url: process.env.PROVIDER_URL_INFURA_BSC_MAINNET,
      chainId: 56,
      gasPrice: 'auto',
      tags: ['production', 'bsc'],
    },
    bscTestnet: {
      url: process.env.PROVIDER_URL_INFURA_BSC_TESTNET,
      chainId: 97,
      gasPrice: 'auto',
      tags: ['testnet', 'bsc'],
    },
  },
}

