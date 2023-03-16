const { ethers } = require('hardhat')

const weiValue = ethers.utils.parseUnits('1', 'ether')

const holders = [
  {
    name: 'TEST1_WALLET',
    wallet: '0xABCE7FE58Ba3Dc24685416201175aCe8Bfb5C451',
    allocation: ethers.utils.parseUnits('50000000', 'ether'),
  },
  {
    name: 'TEST2_WALLET',
    wallet: '0x309cd07e1bA2B459Fb90237C6BF09457C87EbBFF',
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
  {
    name: 'TEST3_WALLET',
    wallet: '0x62a69D28DCFeb4A8579c3b70cd479C77fF60F10B',
    allocation: ethers.utils.parseUnits('75000000', 'ether'),
  },
]
const AssetData = [
  'Edu-Coin', // Token Name
  'EDC', // Token Symbol
  18, // Token Decimals
  holders.map((holder) => holder.wallet), // Holders list
  holders.map((holder) => holder.allocation), // Holders allocation
  '0xB87EbEB1f4aA317bd3eEc04704D3fFD6e3BC4b8f', // ForwarderRegistry contract ?
]

module.exports = AssetData

