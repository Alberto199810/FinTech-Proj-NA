var CommitRevealElections = artifacts.require("./CommitRevealElections.sol");

module.exports = function(deployer) {
  deployer.deploy(CommitRevealElections);
};
