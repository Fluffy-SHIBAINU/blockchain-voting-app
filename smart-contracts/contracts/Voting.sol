// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint256 public candidatesCount;

    event Voted(address indexed voter, uint256 candidateId);

    constructor() {
        addCandidate("Ronald Dumptruck");
        addCandidate("John Sleepy Biduu");
        addCandidate("Killary Klinton");
    }

    function addCandidate(string memory _name) public {
        candidates[candidatesCount] = Candidate(_name, 0);
        candidatesCount++;
    }

    function vote(uint256 _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted!");
        require(_candidateId < candidatesCount, "Invalid candidate ID");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidatesCount() public view returns (uint256) {
        return candidatesCount;
    }

    function getCandidate(uint256 _candidateId) public view returns (string memory, uint256) {
        require(_candidateId < candidatesCount, "Invalid candidate ID");
        return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }
}
