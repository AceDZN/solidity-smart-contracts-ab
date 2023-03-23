module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId, getUnnamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const { utils } = require('ethers')

  const arguments = require('../deploy_arguments')
  const [tokenName, tokenSymbol, tokenDecimals, holders, amounts, depAdd] = [...arguments]
  console.log('deployScript started')
  
  const args = [tokenName, tokenSymbol, tokenDecimals, holders, amounts, depAdd]
  console.log(`Deploy ${tokenName}(${args.join(',')})`)
  console.log(`Deployed By: ${deployer}`)

  const contract = await deploy('EDuCoin', {
    from: deployer,
    gasLimit: 4000000,
    args,
  })
  console.log(`Deployed EDC contract, ADDRESS: ${contract.address}`)
}

