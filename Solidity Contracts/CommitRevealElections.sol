pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./String_Evaluation.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CommitRevealElections is String_Evaluation {

    using SafeMath for uint256;

    ///// FUNDAMENTAL VARIABLES DEFINITION

    uint256 public timeForProposal;
    uint256 public timeForCommitment; 
    uint256 public timeForReveal;
    string ballotTitle;
    address[] appliersForRights;
    uint256 startingVotes;
    uint256 public maximumChoicesAllowed;
    address owner;
    uint256 public numberOfChoices;
    uint256 public numofWinners;
    uint256 public amountOfStake;

    // Let's initialize structs

    struct Candidates {
        string[] candidateList;
        mapping (string => uint256) votesReceived;
    }

    struct Voter {
        address[] voterList;
        mapping (address => bool[]) depositStake;
        mapping (address => uint256) totalStakeOfAddress;
        mapping (address => bytes32[]) voteOfAddress;
        mapping (address => uint256) attemptedVotes;
        mapping(bytes32 => uint256) amountOfEachVote;
    }

    Candidates c;
    Voter v;

    // Let's build our constructor
    constructor(uint256 _timeForProposal, uint256 _timeForCommitment, uint256 _timeForReveal, uint256 _maximumChoices, 
                string memory _ballotTitle, address _owner, address[] memory _listOfWAddress, string[] memory _startingCand,
                uint256 _startingV, uint256 _numofWinners, uint256 _amountOfStake) public {
        require(_timeForCommitment >= 20);
        require(_timeForReveal >= 20);
        require(_startingCand.length <= _maximumChoices);
        maximumChoicesAllowed = _maximumChoices;
        timeForProposal = block.timestamp + _timeForProposal * 1 seconds;
        timeForCommitment = timeForProposal + _timeForCommitment * 1 seconds;
        timeForReveal = timeForCommitment + _timeForReveal * 1 seconds;
        ballotTitle = _ballotTitle;
        startingVotes = _startingV;
        amountOfStake = _amountOfStake * 1 ether;
        owner = _owner;
        for (uint256 y = 0; y < _listOfWAddress.length; y++){
            v.voterList.push(_listOfWAddress[y]);
            v.attemptedVotes[_listOfWAddress[y]] = _startingV;
        }
        for (uint256 q = 0; q < _startingCand.length; q++){
            c.candidateList.push(_startingCand[q]);
        }
        numberOfChoices = _startingCand.length;
        numofWinners = _numofWinners;
    }

    // Information about the current status of the vote
    uint256 private numberOfVotesCast = 0;

    // The actual votes and vote commits
    bytes32[] private voteCommits;
    mapping(bytes32 => string) voteStatuses; // Either `Committed` or `Revealed`
    
    // Events used to log what's going on in the contract
    event missingTime(uint256 missingT);
    event candidateSet(string newCand);
    event newVoteCommit(string intro1, bytes32 newVoteC);
    event newVoteRevealed(string intro2, bytes32 newVoteR);
    event winnersResults(string intro3, string[] winnersN, uint256[] votesOfWinn);

    mapping (address => bool) private proposedCandidates; // Useful for submitting only one choice

    ///// FUNDAMENTAL FUNCTIONS

    // Function to set the candidates proposed by each voter
    function setCandidates(string memory _candidate) public {
        require(block.timestamp <= timeForProposal, "Proposal period is over!");
        require(numberOfChoices <= maximumChoicesAllowed, "Proposals are over.");
        require(checkifWhitelisted(msg.sender) == true, "You're not allowed to participate in this ballot");
        require(proposedCandidates[msg.sender] == false, "You already did your proposal"); //Only one proposal
        for (uint256 p = 0; p < c.candidateList.length; p++) {
            if (keccak256(abi.encodePacked(_candidate)) == keccak256(abi.encodePacked(c.candidateList[p]))){
                revert();
            } else {continue;}
        } // If candidate is already in the list, revert the transaction
        c.candidateList.push(_candidate);
        proposedCandidates[msg.sender] = true;
        numberOfChoices++;
        emit candidateSet(_candidate);
    }
    
    // Function to Commit the vote
    function commitVote(bytes32 _voteCommitment, uint256 _ammontare) public payable {

        require(block.timestamp > timeForProposal, "Proposal period is still going on!");
        require(block.timestamp <= timeForCommitment, "Commitment period is over!");
        require(checkifWhitelisted(msg.sender) == true, "You're not allowed to participate in this ballot");
        require(_ammontare <= v.attemptedVotes[msg.sender], "You've finished your voting tokens!");
        require(msg.value == amountOfStake, "Please send the stake");
        
        // Check if this commit has been used before
        bytes memory bytesVoteCommit = bytes(voteStatuses[_voteCommitment]);
        require(bytesVoteCommit.length == 0);
        
        // We are still in the committing period & the commit is new so add it
        voteCommits.push(_voteCommitment);
        voteStatuses[_voteCommitment] = "Committed";
        v.voteOfAddress[msg.sender].push(_voteCommitment);
        numberOfVotesCast += _ammontare;
        v.amountOfEachVote[_voteCommitment] = _ammontare;
        v.attemptedVotes[msg.sender] -= _ammontare;
        v.depositStake[msg.sender].push(true);
        v.totalStakeOfAddress[msg.sender] += amountOfStake;
        emit newVoteCommit("Vote committed with the following hash:", _voteCommitment);
    }

    mapping (address => bool) private isTrue; // Useful for vote only once

    // Function to Reveal the vote
    function revealVote(string memory _vote, bytes32 _voteCommit) public {

        // Requirements! Very important to secure the whole process
        require(checkifWhitelisted(msg.sender) == true, "You're not allowed to participate in this ballot");
        for (uint256 tru = 0; tru < v.depositStake[msg.sender].length; tru++){
            require (v.depositStake[msg.sender][tru] == true, "You didn't deposit the stake for all your votes!");
        }
        require (v.depositStake[msg.sender].length == v.voteOfAddress[msg.sender].length, "You didn't deposit the stake for all your votes!");
        require(block.timestamp > timeForCommitment, "Time is not over! You cannot reveal your vote yet");
        require(block.timestamp <= timeForReveal, "Revealing period is over!");
        for (uint256 u = 0; u < v.voteOfAddress[msg.sender].length; u++){
            if (v.voteOfAddress[msg.sender][u] == _voteCommit){
                isTrue[msg.sender] = true;
            } else {continue;}
        }
        require(isTrue[msg.sender] == true, "You didn't cast this vote!");
        bytes memory bytesVoteStatus = bytes(voteStatuses[_voteCommit]); //To be counted, it has to be "Committed"
        require(bytesVoteStatus[0] == "C", "This vote was already cast");
        require(_voteCommit == keccak256(abi.encodePacked(_vote)), "Vote hash does not match vote commit");
        
       // NEXT: Count the vote! To count it we take the substring until character "-", and we compare it to the candidates
        uint256 lenOfVote = utfStringLength(_vote);
        uint256 divisor;
        for (uint256 i = 1; i<lenOfVote; i++) {
            string memory substr = getSlice(i, i, _vote);
            if (keccak256(abi.encodePacked(substr)) == keccak256(abi.encodePacked("-"))){
                divisor = i;
            } else {continue;}
        }
        string memory finalVote = getSlice(1, divisor-1, _vote);
        for (uint256 j = 0; j < numberOfChoices; j++){
            if (keccak256(abi.encodePacked(finalVote)) == keccak256(abi.encodePacked(c.candidateList[j]))){
                c.votesReceived[c.candidateList[j]] += v.amountOfEachVote[_voteCommit];
            } else {continue;}
        }
        voteStatuses[_voteCommit] = "Revealed";
        payable(msg.sender).transfer(amountOfStake);
        v.totalStakeOfAddress[msg.sender] -= amountOfStake;
        emit newVoteRevealed("Vote revealed and counted with commitment", _voteCommit);
    }

    mapping(string => bool) userinList;

    // Function to be used after Time for Revealing is over. You can see the winners of the ballot
    function getWinners() public onlyOwner returns(string[] memory, uint256[] memory) {

        require(block.timestamp > timeForReveal, "Revealing period is not over yet!");

        uint256[] memory store_vars = new uint256[](numofWinners);
        string[] memory Win_Cands = new string[](numofWinners);

        for (uint256 cnumb = 0; cnumb < numofWinners; cnumb++) {
            for(uint256 xx = 0; xx < c.candidateList.length; xx++){
                if (store_vars[cnumb] <= c.votesReceived[c.candidateList[xx]] && userinList[c.candidateList[xx]] == false) {
                    store_vars[cnumb] = c.votesReceived[c.candidateList[xx]];
                    Win_Cands[cnumb] = c.candidateList[xx];  
                }
            }
            userinList[Win_Cands[cnumb]] = true;  
        }
        emit winnersResults("Winners revealed and ballot's over! Winners:", Win_Cands, store_vars); 
        
        for (uint256 wnumb = 0; wnumb < Win_Cands.length; wnumb++) {
            userinList[Win_Cands[wnumb]] = false;
        } // Reset of mapping

        return (Win_Cands, store_vars); 
    }

    ///// OTHER FUNCTIONS

    // Modifier to allow functions callable only by the owner
    modifier onlyOwner {
        require(msg.sender == owner, "Caller is not the owner of the contract!");
        _;
    }

    //Function to check if voter is enabled to vote
    function checkifWhitelisted(address _indir) private view returns (bool) {
        for(uint256 k = 0; k < v.voterList.length; k++) {
            address indir = v.voterList[k];
            if (indir == _indir) {
                return true;
            }
        }
        return false;
    }

    // Function to apply for rights
    function applyForRights() public {
        for (uint256 votnum = 0; votnum < v.voterList.length; votnum++){
            require(msg.sender != v.voterList[votnum], "You already have your voting right!");
        }
        require(block.timestamp <= timeForCommitment, "Commitment period is over!");
        appliersForRights.push(msg.sender);
    }

    // Function that allows owner to see who applied for vote rights
    function showApplierForRights() public view onlyOwner returns(address[] memory){
        require(block.timestamp <= timeForCommitment, "Commitment period is over!");
        return appliersForRights;
    }

    // Function that allows owner to give vote rights to the voters who asked for rights
    function giveRightsToAddresses(address[] memory _newWhiteAddresses) public onlyOwner {
        require(block.timestamp <= timeForCommitment, "Commitment period is over!");
        for (uint256 ynum = 0; ynum < _newWhiteAddresses.length; ynum++){
            v.voterList.push(_newWhiteAddresses[ynum]);
            v.attemptedVotes[_newWhiteAddresses[ynum]] = startingVotes;
        }
    }

    // Function to see the proposed candidates up to that moment
    function showCandidates() public view returns(string[] memory) {
        require(checkifWhitelisted(msg.sender) == true, "You're not allowed to participate in this ballot");
        return c.candidateList;
    }

    // Function to be used after Time for Revealing is over. You can see votes for a single candidate
    function votesForACandidate(string memory _candidate) public view onlyOwner returns(uint256) {
        require(block.timestamp >= timeForReveal, "Revealing period is not over yet!");
        return c.votesReceived[_candidate];
    }

    // Function to see the remaining time for PROPOSAL
    function getRemainingTimeForProposal() public returns (uint256) {
        require(checkifWhitelisted(msg.sender) == true, "You're not allowed to participate in this ballot");
        require(block.timestamp <= timeForProposal, "Proposal period is over!");
        emit missingTime(timeForProposal - block.timestamp);
        return timeForProposal - block.timestamp;
    }

    // Function to see the remaining time for COMMITMENT
    function getRemainingTimeForCommitment() public returns (uint256) {
        require(checkifWhitelisted(msg.sender) == true, "You're not allowed to participate in this ballot");
        require(block.timestamp > timeForProposal, "Proposal period is still going on!");
        require(block.timestamp <= timeForCommitment, "Commitment period is over!");
        emit missingTime(timeForCommitment - block.timestamp);
        return timeForCommitment - block.timestamp;
    }

    // Function to see the remaining time for REVEAL
    function getRemainingTimeForReveal() public returns (uint256) {
        require(checkifWhitelisted(msg.sender) == true, "You're not allowed to participate in this ballot");
        require(block.timestamp > timeForCommitment, "Commitment period is still going on!");
        require(block.timestamp <= timeForReveal, "Reveal period is over!");
        emit missingTime(timeForReveal - block.timestamp);
        return timeForReveal - block.timestamp;
    }

    // Function to get title of ballot
    function getTitle() public view returns (string memory) {
        require(checkifWhitelisted(msg.sender) == true, "You're not allowed to participate in this ballot");
        return ballotTitle;
    }

    function ballotBalance() external view onlyOwner returns(uint balanceEth) {
        balanceEth = address(this).balance;
    }

}