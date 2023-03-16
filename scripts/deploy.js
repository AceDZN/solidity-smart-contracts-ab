const hre = require('hardhat')

async function main() {
  const arguments = require('./args/arguments')

  ;[deployer] = await ethers.getSigners()
  console.log(`DEPLOYER: ${deployer.address}`)

  const [name, symbol, decimal, holders, amounts, depAdd] = [...arguments]

  const EDC_CONTRACT = await ethers.getContractFactory('EDuCoin')

  contract = await EDC_CONTRACT.deploy(name, symbol, decimal, [...holders], [...amounts], depAdd)

  console.log(`deploy in progress...`)
  await contract.deployed()
  console.log(`Deployed EDC contract, ADDRESS: ${contract.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

