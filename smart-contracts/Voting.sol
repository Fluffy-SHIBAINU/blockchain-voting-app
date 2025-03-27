
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Proposal {
        string ipfsHash;
        uint voteCount;
    }

    Proposal[] public proposals;

    function createProposal(string memory ipfsHash) public {
        proposals.push(Proposal(ipfsHash, 0));
    }

    function vote(uint proposalIndex) public {
        proposals[proposalIndex].voteCount++;
    }
}
