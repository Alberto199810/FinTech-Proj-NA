pragma solidity ^0.4.7;
pragma experimental ABIEncoderV2;

import "./String_Evaluation.sol";

contract CommitRevealElections is String_Evaluation {

    ///// FUNDAMENTAL VARIABLES DEFINITION

    uint public timeForCommitment; 
    uint public timeForReveal;
    string ballotTitle;
    uint public maximumChoicesAllowed;
    address owner;

    constructor(uint _timeForCommitment, uint _timeForReveal, uint _maximumChoices, string _ballotTitle, address _owner) public {
        require(_timeForCommitment >= 20);
        require(_timeForReveal >= 20);
        maximumChoicesAllowed = _maximumChoices;
        timeForCommitment = now + _timeForCommitment * 1 seconds;
        timeForReveal = timeForCommitment + _timeForReveal * 1 seconds;
        ballotTitle = _ballotTitle;
        owner = _owner;
    }

    // Let's initialize candidates
    struct Candidates {
        string[] candidateList;
        mapping (string => uint256) votesReceived;
    }

    Candidates c;

    // Modifier to allow functions callable only by the owner
    modifier onlyOwner {
        require(msg.sender == owner, "Caller is not the owner of the contract!");
        _;
    }

    // Information about the current status of the vote
    uint public numberOfVotesCast = 0;
    uint public numberOfChoices = 0;

    // The actual votes and vote commits
    bytes32[] public voteCommits;
    mapping(bytes32 => string) voteStatuses; // Either `Committed` or `Revealed`
    
    // Events used to log what's going on in the contract
    event logString(string);
    event newVoteCommit(string, bytes32);
    
    mapping (address => bool) public proposedCandidates; // Useful for submitting only one choice

    ///// FUNCTIONS

    // Function to set the candidates proposed by each voter
    function setCandidates(string _candidate) public {
        require(proposedCandidates[msg.sender] == false, "You already did your proposal"); //Only one proposal
        c.candidateList.push(_candidate);
        proposedCandidates[msg.sender] = true;
        numberOfChoices++;
    }

    // Function to see the proposed candidates up to that moment
    function showCandidates() public view returns(string[]) {
        return c.candidateList;
    }

    mapping (address => bool) public hasVoted; // Useful for vote only once
    
    // Function to Commit the vote
    function commitVote(bytes32 _voteCommit) public {

        require(now <= timeForCommitment, "Committing period is over!");
        require(hasVoted[msg.sender] == false, "You already voted!");
        
        // Check if this commit has been used before
        bytes memory bytesVoteCommit = bytes(voteStatuses[_voteCommit]);
        require(bytesVoteCommit.length == 0);
        
        // We are still in the committing period & the commit is new so add it
        voteCommits.push(_voteCommit);
        voteStatuses[_voteCommit] = "Committed";
        numberOfVotesCast++;
        hasVoted[msg.sender] = true;
        emit newVoteCommit("Vote committed with the following hash:", _voteCommit);
    }

    // Function to Reveal the vote
    function revealVote(string _vote, bytes32 _voteCommit) public {

        require(now > timeForCommitment, "Time is not over! You cannot reveal your vote yet");
        require(now <= timeForReveal, "Revealing period is over!");
        
        // FIRST: Verify the vote & commit is valid
        bytes memory bytesVoteStatus = bytes(voteStatuses[_voteCommit]); //To be counted, it has to be "Committed"

        require(bytesVoteStatus.length != 0, "A vote with this voteCommit was not cast");
        require(bytesVoteStatus[0] == "C", "This vote was already cast");
        require(_voteCommit == keccak256(_vote), "Vote hash does not match vote commit");
        
        // NEXT: Count the vote! To count it we take the substring until character "-", and we compare it to the candidates
        uint lenOfVote = utfStringLength(_vote);
        uint divisor;
        for (uint i = 1; i<lenOfVote; i++) {
            string memory substr = getSlice(i, i, _vote);
            if (keccak256(abi.encodePacked(substr)) == keccak256(abi.encodePacked("-"))){
                divisor = i;
            } else {continue;}
        }
        string memory finalVote = getSlice(1, divisor-1, _vote);
        for (uint j = 0; j < numberOfChoices; j++){
            if (keccak256(abi.encodePacked(finalVote)) == keccak256(abi.encodePacked(c.candidateList[j]))){
                c.votesReceived[c.candidateList[j]]++;
            } else {continue;}
        }
        emit logString("Vote revealed and counted.");
        voteStatuses[_voteCommit] = "Revealed";
    }

    // Function to be used after Time for Revealing is over. You can see votes for a single candidate
    function votesForACandidate(string _candidate) public view onlyOwner returns(uint) {
        require(now >= timeForReveal, "Time for revealing is not over yet");
        return c.votesReceived[_candidate];
    }

    // Function to be used after Time for Revealing is over. You can see the winner of the ballot
    function getWinner() public view onlyOwner returns(string){
        require(now >= timeForReveal, "Time for revealing is not over yet");

        uint store_var = 0;
        string memory Win_Cand;

        for(uint i=0 ; i<c.candidateList.length ; i++){
            if (store_var < c.votesReceived[c.candidateList[i]]){
                store_var = c.votesReceived[c.candidateList[i]];
                Win_Cand = c.candidateList[i];
            }
        }
        return(Win_Cand);
    }

    // Function to see the remaining time for COMMITMENT
    function getRemainingTimeForCommitment() public view returns (uint) {
       require(now <= timeForCommitment, "Committment period is over!");
        return timeForCommitment - now;
    }

    // Function to see the remaining time for REVEAL
    function getRemainingTimeForRevealLimit() public view returns (uint) {
        require(now > timeForCommitment, "Committment period is still going on!");
        return timeForReveal - now;
    }

    // Function to get title of ballot
    function getTitle() public view returns (string) {
        return ballotTitle;
    }
   
}