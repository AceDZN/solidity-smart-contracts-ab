const { loadConfigFolder } = require('@animoca/ethereum-contract-helpers/src/config')
const config = loadConfigFolder(__dirname)
//console.log('HardHat Configuration: ', config)
module.exports = config

