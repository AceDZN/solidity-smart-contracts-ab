const { expect, assert } = require('chai')
const { ethers } = require('hardhat')
const { runBehaviorTests } = require('@animoca/ethereum-contract-helpers/src/test/run')
const { getDeployerAddress } = require('@animoca/ethereum-contract-helpers/src/test/accounts')
const { getForwarderRegistryAddress } = require('@animoca/ethereum-contracts/test/helpers/registries')
const { behavesLikeERC20 } = require('@animoca/ethereum-contracts/test/contracts/token/ERC20/behaviors/ERC20.behavior')

const name = 'EDC'
const symbol = 'EDC'
const decimals = ethers.BigNumber.from('18')
const tokenURI = 'https://web3.tinytap.it'
const recipients = [] //['0x4470C9799e3BCb1e97dFF44fd63122645B46125D']
const amounts = [] //[100]

const config = {
  immutable: {
    name: 'EDuCoinMock',
    ctorArguments: ['name', 'symbol', 'decimals', 'recipients', 'amounts', 'forwarderRegistry'],
    testMsgData: true,
  },
  defaultArguments: {
    name,
    symbol,
    decimals,
    recipients,
    amounts,
    forwarderRegistry: getForwarderRegistryAddress,
    initialAdmin: getDeployerAddress,
    initialOwner: getDeployerAddress,
  },
}

runBehaviorTests('EDuCoinMock', config, function (deployFn) {
  const implementation = {
    name,
    symbol,
    decimals,
    tokenURI,
    recipients,
    amounts,
    revertMessages: {
      // ERC20
      ApproveToZero: 'ERC20: approval to address(0)',
      TransferExceedsBalance: 'ERC20: insufficient balance',
      TransferToZero: 'ERC20: transfer to address(0)',
      TransferExceedsAllowance: 'ERC20: insufficient allowance',
      InconsistentArrays: 'ERC20: inconsistent arrays',
      SupplyOverflow: 'ERC20: supply overflow',
      // ERC20Allowance
      AllowanceUnderflow: 'ERC20: insufficient allowance',
      AllowanceOverflow: 'ERC20: allowance overflow',
      // ERC20BatchTransfers
      BatchTransferValuesOverflow: 'ERC20: values overflow',
      // ERC20SafeTransfers
      SafeTransferRejected: 'ERC20: safe transfer rejected',
      // ERC2612
      PermitFromZero: 'ERC20: permit from address(0)',
      PermitExpired: 'ERC20: expired permit',
      PermitInvalid: 'ERC20: invalid permit',
      // Admin
      NotMinter: "AccessControl: missing 'minter' role",
      NotContractOwner: 'Ownership: not the owner',
    },
    features: {
      // ERC165: true,
      EIP717: true, // unlimited approval
      AllowanceTracking: true,
    },
    interfaces: {
      ERC20: true,
      ERC20Detailed: true,
      ERC20Metadata: true,
      ERC20Allowance: true,
      ERC20BatchTransfer: true,
      ERC20Safe: true,
      ERC20Permit: true,
    },
    methods: {},
    deploy: async function (initialHolders, initialBalances, deployer) {
      const contract = await deployFn()
      await contract.grantRole(await contract.MINTER_ROLE(), deployer.address)
      await contract.batchMint(initialHolders, initialBalances)
      return contract
    },
  }

  let deployer

  before(async function () {
    ;[deployer] = await ethers.getSigners()
  })

  behavesLikeERC20(implementation)
})

describe('EDuCoin allocation on deploy', function () {
  let EDuCoin, add1, add2, deployer
  const arguments = require('../test_arguments')
  const [tokenName, tokenSymbol, tokenDecimals, tokenHolders, tokenAmounts, forwardRegistryContract] = [...arguments]
  const totalSupply = tokenAmounts.reduce((accumulator, currentValue) => BigInt(accumulator) + BigInt(currentValue), 0)

  beforeEach('Set EDC enviroment for tests', async () => {
    //;[deployer, add1, add2] = await ethers.getSigners()

    // deploy CourseNFT
    const EDuCoinContract = await ethers.getContractFactory('EDuCoin')
    EDuCoin = await EDuCoinContract.deploy(
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenHolders,
      tokenAmounts,
      forwardRegistryContract,
    )
    await EDuCoin.deployed()
  })

  it('check that totalSupply equal to all holders allocations', async () => {
    await EDuCoin.totalSupply().then((contractTotal) => {
      expect(contractTotal).to.eq(totalSupply)
      //assert.fail('must throw err')
    })
  })
  it('check each user has the correct allocation', async () => {
    for (let i = 0; i < tokenHolders.length; i++) {
      await EDuCoin.balanceOf(tokenHolders[i]).then((userBalance) => {
        expect(userBalance).to.eq(BigInt(tokenAmounts[i]))
        //assert.fail('must throw err')
      })
    }
  })
})

