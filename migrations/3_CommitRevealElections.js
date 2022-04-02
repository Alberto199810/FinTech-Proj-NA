var CommitRevealElections = artifacts.require("./CommitRevealElections.sol");

module.exports = function(deployer) {

  deployer.deploy(CommitRevealElections, 
                  60, /*_timeForProposal*/
                  60, /*_timeForCommitment*/
                  60, /*_timeForReveal*/
                  5, /*_maximumChoices*/
                  "Test Election", /*_ballotTitle*/ 
                  "0x45615F9Ef7FAf9D971E50567F0916D53E8B3cDD5", /*_owner*/
                  ["0x65fe3B29eE09f70AC1e9F531F577d6569512f62E","0x59d5052BeeCf982986F98d13482D9e7A758d7032"], /*_voterList*/ 
                  ["Biden","Obama","Trump"], /*_startingCand*/
                  10, /*_startingVotes*/
                  2, /*_numofWinners*/
                  1 /*_amountOfStake*/);

};