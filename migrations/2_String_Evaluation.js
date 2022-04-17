var String_Evaluation = artifacts.require("./String_Evaluation.sol");
  
module.exports = function(deployer) {
  
  // Deploying the contract to the blockchain
  deployer.deploy(String_Evaluation);
};