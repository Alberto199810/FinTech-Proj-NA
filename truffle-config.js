const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
require('dotenv').config()  // Store environment-specific variable from '.env' to process.env
var mnemonic = process.env["MNEMONIC"];
var tokenkey = process.env["INFURA_API_KEY"];

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },
 networks: {
  develop: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: 5777,       // Any network (default: none)
    },
  rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + tokenkey);
      },
      network_id: 4
  }
 }
};
