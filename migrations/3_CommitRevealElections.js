var CommitRevealElections = artifacts.require("./CommitRevealElections.sol");

module.exports = function(deployer) {

  deployer.deploy(CommitRevealElections, 
                  0, /*_timeForProposal*/
                  600, /*_timeForCommitment*/
                  600, /*_timeForReveal*/
                  5, /*_maximumChoices*/
                  "Test Election", /*_ballotTitle*/ 
                  "0xCB5e34D036Cb39B2C00177a063CD3E8ecBa6Cd50", /*_owner*/
                  ["0x2E4a9C6CF87Cfe7e38907D784c744720D2C6ACdD","0xc7459e1100e7d9748a7900cC37bE5e2C93711CFf"], /*_voterList*/ 
                  ["Biden","Obama","Trump"], /*_startingCand*/
                  10, /*_startingVotes*/
                  2, /*_numofWinners*/
                  1 /*_amountOfStake*/);

};

/*  0, 600, 600, 5, "Test Election", "0xCB5e34D036Cb39B2C00177a063CD3E8ecBa6Cd50", ["0x2E4a9C6CF87Cfe7e38907D784c744720D2C6ACdD","0xc7459e1100e7d9748a7900cC37bE5e2C93711CFf"], ["Biden","Obama","Trump"], 10, 2, 1 */