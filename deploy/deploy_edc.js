module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId, getUnnamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const { utils } = require('ethers')

  async function getAllocations(hre) {
    const namedAccounts = await hre.getNamedAccounts()
    console.log(namedAccounts, 'getAllocations namedAccounts <<<<<<<----------')

    const holders = [
      {
        name: 'LAUNCHPAD_PUBLIC_SALE_WALLET',
        wallet: namedAccounts.LAUNCHPAD_PUBLIC_SALE_WALLET,
        allocation: '50000000',
      },
      {
        name: 'LIQUIDITY_POOL_WALLET',
        wallet: namedAccounts.LIQUIDITY_POOL_WALLET,
        allocation: '100000000',
      },
      {
        name: 'EARLY_CONTRIBUTOR_POOL_WALLET',
        wallet: namedAccounts.EARLY_CONTRIBUTOR_POOL_WALLET,
        allocation: '75000000',
      },
      {
        name: 'ECOSYSTEM_FUND_WALLET',
        wallet: namedAccounts.ECOSYSTEM_FUND_WALLET,
        allocation: '270000000',
      },
      {
        name: 'TREASURY_WALLET',
        wallet: namedAccounts.TREASURY_WALLET,
        allocation: '100000000',
      },
      {
        name: 'STRATEGIC_INVESTORS_WALLET',
        wallet: namedAccounts.STRATEGIC_INVESTORS_WALLET,
        allocation: '150000000',
      },
      {
        name: 'ADVISORS_WALLET',
        wallet: namedAccounts.ADVISORS_WALLET,
        allocation: '100000000',
      },
      {
        name: 'MARKETING_WALLET',
        wallet: namedAccounts.MARKETING_WALLET,
        allocation: '55000000',
      },
      {
        name: 'TEAM_WALLET',
        wallet: namedAccounts.TEAM_WALLET,
        allocation: '100000000',
      },
    ]
    console.log(holders, '<<<<<<HOLDERS>>>>>>')

    //console.log('deployed allocations:', JSON.stringify(holders))
    return holders
  }
  const arguments = require('../deploy_arguments')
  const [tokenName, tokenSymbol, tokenDecimals, holders, amounts, depAdd] = [...arguments]
  console.log('deployScript started')

  const getHolders = async () =>
    (await getAllocations(hre)).map((holder) => {
      console.log('<><><> HOLDER    <><><', holder.wallet)
      return holder.wallet
    })
  const getAmounts = async () => (await getAllocations(hre)).map((holder) => utils.parseEther(holder.allocation))

  const holders_wallets = await getHolders()
  const holders_amounts = await getAmounts()
  const args = [tokenName, tokenSymbol, tokenDecimals, holders_wallets, holders_amounts, depAdd]
  console.log(`Deploy ${tokenName}(${args.join(',')})`)

  const contract = await deploy('EDuCoin', {
    from: deployer,
    gasLimit: 4000000,
    args,
  })
  console.log(`Deployed EDC contract, ADDRESS: ${contract.address}`)
}

