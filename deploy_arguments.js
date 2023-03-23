const { ethers } = require('hardhat')

const weiValue = ethers.utils.parseUnits('1', 'ether')

const holders = [
  {
    name: 'LAUNCHPAD_PUBLIC_SALE_WALLET',
    wallet: process.env.LAUNCHPAD_PUBLIC_SALE_WALLET,
    allocation: ethers.utils.parseUnits('50000000', 'ether'),
  },
  {
    name: 'LIQUIDITY_POOL_WALLET',
    wallet: process.env.LIQUIDITY_POOL_WALLET,
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
  {
    name: 'EARLY_CONTRIBUTOR_POOL_WALLET',
    wallet: process.env.EARLY_CONTRIBUTOR_POOL_WALLET,
    allocation: ethers.utils.parseUnits('75000000', 'ether'),
  },
  {
    name: 'ECOSYSTEM_FUND_WALLET',
    wallet: process.env.ECOSYSTEM_FUND_WALLET,
    allocation: ethers.utils.parseUnits('270000000', 'ether'),
  },
  {
    name: 'TREASURY_WALLET',
    wallet: process.env.TREASURY_WALLET,
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
  {
    name: 'STRATEGIC_INVESTORS_WALLET',
    wallet: process.env.STRATEGIC_INVESTORS_WALLET,
    allocation: ethers.utils.parseUnits('150000000', 'ether'),
  },
  {
    name: 'ADVISORS_WALLET',
    wallet: process.env.ADVISORS_WALLET,
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
  {
    name: 'MARKETING_WALLET',
    wallet: process.env.MARKETING_WALLET,
    allocation: ethers.utils.parseUnits('55000000', 'ether'),
  },
  {
    name: 'TEAM_WALLET',
    wallet: process.env.TEAM_WALLET,
    allocation: ethers.utils.parseUnits('100000000', 'ether'),
  },
]
const AssetData = [
  'Education Token', // Token Name
  'EDU', // Token Symbol
  18, // Token Decimals
  holders.map((holder) => holder.wallet), // Holders list
  holders.map((holder) => holder.allocation), // Holders allocation
  '0xB87EbEB1f4aA317bd3eEc04704D3fFD6e3BC4b8f', // ForwarderRegistry contract ?
]

module.exports = AssetData

