const { ethers } = require('hardhat')

const weiValue = ethers.utils.parseUnits('1', 'ether')

const holders = [
  {
    name: 'Launchpad Public Sale Wallet',
    wallet: '0xABCE7FE58Ba3Dc24685416201175aCe8Bfb5C451',
    allocation: ethers.utils.parseUnits('50000000', 'ether'),
  },
  {
    name: 'Liquidity Pool',
    wallet: '0x309cd07e1bA2B459Fb90237C6BF09457C87EbBFF',
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
  {
    name: 'Early Contributors Pool',
    wallet: '0x62a69D28DCFeb4A8579c3b70cd479C77fF60F10B',
    allocation: ethers.utils.parseUnits('75000000', 'ether'),
  },
  {
    name: 'Ecosystem Fund',
    wallet: '0xC9A2623C7d9981BB4826a47edc5b0F4693A91a9F',
    allocation: ethers.utils.parseUnits('270000000', 'ether'),
  },
  {
    name: 'Treasury',
    wallet: '0x32311040f1457304996c75D8F5a713B2Af19ac38',
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
  {
    name: 'Strategic investors',
    wallet: '0x88CC8e8e9AEcC851C9fB7CD7b4D9ddBD20846D19',
    allocation: ethers.utils.parseUnits('150000000', 'ether'),
  },
  {
    name: 'Advisors',
    wallet: '0x940859BB050ec615B6280954C4C4aad1822e199C',
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
  {
    name: 'Marketing',
    wallet: '0xce46BE6888A33CDE97621BF23A721f97F5d80243',
    allocation: ethers.utils.parseUnits('55000000', 'ether'),
  },
  {
    name: 'Team',
    wallet: '0x86CA78E96904652f1079915b91A06237C77858DB',
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
]
const AssetData = [
  'Education Coin', // Token Name
  'EDC', // Token Symbol
  18, // Token Decimals
  holders.map((holder) => holder.wallet), // Holders list
  holders.map((holder) => holder.allocation), // Holders allocation
  '0xB87EbEB1f4aA317bd3eEc04704D3fFD6e3BC4b8f', // ForwarderRegistry contract ?
]

module.exports = AssetData

