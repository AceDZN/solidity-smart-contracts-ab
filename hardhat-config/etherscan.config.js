module.exports = {
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY_MAINNET,
      goerli: process.env.ETHERSCAN_API_KEY_GOERLI,
      polygonMumbai: process.env.ETHERSCAN_API_KEY_MUMBAI,
      polygon: process.env.ETHERSCAN_API_KEY_MATIC,
      bsc: process.env.ETHERSCAN_API_KEY_BNB,
      bscTestnet: process.env.ETHERSCAN_API_KEY_BNB,
    },
  },
}

