const { utils } = require('ethers')
const { skipChainTypesExceptFor } = require('@animoca/ethereum-migrations/src/helpers/common')
const Contract_deploy = require('@animoca/ethereum-migrations/src/templates/Contract/deploy')

async function getAllocations(hre) {
  const namedAccounts = await hre.getNamedAccounts()

  const mainnetAllocations = [
    {
      name: 'GAS_PUMP_1',
      address: '0x5991F28C81E19D8b331bDB6AC7512d9cB3b40404',
    },
    {
      name: 'GAS_PUMP_2',
      address: '0x58f053Be26e26FaaAfA57BA2226164260Aad569D',
    },
    {
      name: 'GAS_PUMP_3',
      address: '0x39Ee3fAE7FBe1a27BFd141ff2CF6Dd3C78BfcC23',
    },
    {
      name: 'GAS_PUMP_4',
      address: '0x51BBe2de2aD7db20508db8e12E2b9E7DcD59A4B0',
    },
    {
      name: 'GAS_PUMP_5',
      address: '0xA85BEe9A9BcBCA19037faD907101784387E7cd53',
    },
    {
      name: 'GAS_PUMP_6',
      address: '0xa34283054dc8D98a9Ac79E4499cDf497f459Ab8e',
    },
    {
      name: 'GAS_PUMP_7',
      address: '0xbCf1339AC95Fc8496eFc75524fD63c02e0346F38',
    },
    {
      name: 'GAS_PUMP_8',
      address: '0x03Ec6E2Aaaa789aaae18069825f0b98d9cAC2E4E',
    },
    {
      name: 'GAS_PUMP_9',
      address: '0x4a49c82E6a9471fe413B066f7480b9b79B393646',
    },
    {
      name: 'GAS_PUMP_10',
      address: '0xc5bf32C9Dbb674Af4C76F8C15c4713e32D3373D1',
    },
  ]

  const testnetAllocations = [
    {
      name: 'GAS_PUMP_1',
      address: '0xe44a1278e6217009Ad9aB61eBB24bD2C89657AE1',
    },
    {
      name: 'GAS_PUMP_2',
      address: '0x6773317bee305063e6528b443b3d7b02D4ceA9f5',
    },
    {
      name: 'GAS_PUMP_3',
      address: '0x1833915321D30afD05Fcc7EE334bFdf6D15D9b3f',
    },
    {
      name: 'GAS_PUMP_4',
      address: '0x9972eaec34Aa23f8fF2606A42f490224e0d81807',
    },
  ]

  const allocations = hre.network.tags.production ? mainnetAllocations : testnetAllocations
  return allocations
}

module.exports = Contract_deploy('GasStation', {
  contract: 'OpenCampusGasStation',
  args: [
    {
      name: 'gasPumps',
      value: async (hre) => (await getAllocations(hre)).map((allocation) => allocation.address),
    },
  ],
})
module.exports.skip = skipChainTypesExceptFor('ethereum')

