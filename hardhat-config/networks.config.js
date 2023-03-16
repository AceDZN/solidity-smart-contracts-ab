module.exports = {
  networks: {
    hardhat: {
      gas: 19000000,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      accounts: { mnemonic: process.env.MNEMONIC },
    },

    mainnet: {
      url: process.env.PROVIDER_URL_INFURA_MAINNET,
      chainId: 1,
      gasPrice: 'auto',
      tags: ['production'],
      accounts: { mnemonic: process.env.MNEMONIC },
    },
    polygon: {
      url: process.env.PROVIDER_URL_INFURA_MATIC,
      chainId: 137,
      gasPrice: 'auto',
      tags: ['production'],
      accounts: { mnemonic: process.env.MNEMONIC },
    },
    goerli: {
      url: process.env.PROVIDER_URL_INFURA_GOERLI,
      chainId: 5,
      gasPrice: 'auto',
      tags: ['testnet'],
      accounts: { mnemonic: process.env.MNEMONIC },
    },
    mumbai: {
      url: process.env.PROVIDER_URL_INFURA_MUMBAI,
      chainId: 80001,
      gasPrice: 'auto',
      tags: ['testnet'],
      accounts: { mnemonic: process.env.MNEMONIC },
    },
  },
}

