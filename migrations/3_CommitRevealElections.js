var CommitRevealElections = artifacts.require("./CommitRevealElections.sol");

module.exports = function(deployer) {

  deployer.deploy(CommitRevealElections, 
                  160, /*_timeForProposal*/
                  160, /*_timeForCommitment*/
                  160, /*_timeForReveal*/
                  5, /*_maximumChoices*/
                  "Test Election", /*_ballotTitle*/ 
                  "0xf688af52cAa1972B3226C0225D35C393F3b282b3", /*_owner*/
                  ["0xFeeCe5ed5ABf1150A773548bE2e13C694F7861ea","0x4F5e7EE122c50Cf9D0F27DB015C66a6dBf4E72B6"], /*_voterList*/ 
                  ["Biden","Obama","Trump"], /*_startingCand*/
                  10, /*_startingVotes*/
                  2, /*_numofWinners*/
                  1 /*_amountOfStake*/);

};

/*  0, 600, 600, 5, "Test Election", "0xCB5e34D036Cb39B2C00177a063CD3E8ecBa6Cd50", ["0x2E4a9C6CF87Cfe7e38907D784c744720D2C6ACdD","0xc7459e1100e7d9748a7900cC37bE5e2C93711CFf"], ["Biden","Obama","Trump"], 10, 2, 1 */