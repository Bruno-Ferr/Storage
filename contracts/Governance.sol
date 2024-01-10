// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    mapping(address => bool) votesAddress;

    constructor(address[] memory _members) {
        for(uint i = 0; i < _members.length; i++) {
            votesAddress[_members[i]] = true;
        }
        votesAddress[msg.sender] = true;
    }

    enum VoteState {Absent, Yes, No}

    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
        mapping (address => VoteState) Votes;
    }

    Proposal[] public proposals;

    event ProposalCreated(uint);
    event VoteCast(uint, address);

    function newProposal(address _targetAddress, bytes memory _calldata) external {
        require(votesAddress[msg.sender]);
        emit ProposalCreated(proposals.length);
        Proposal storage proposal = proposals.push();
        proposal.target = _targetAddress;
        proposal.data = _calldata;
    }

    function castVote(uint _proposalId, bool _isSupporting) external {
        require(votesAddress[msg.sender]);
        emit VoteCast(_proposalId, msg.sender);
        Proposal storage proposal = proposals[_proposalId];

        if(proposal.Votes[msg.sender] == VoteState.Yes) {
            proposal.yesCount--;
        }
        if(proposal.Votes[msg.sender] == VoteState.No) {
            proposal.noCount--;
        }

        if(_isSupporting) {
            proposal.yesCount++;
        } else {
            proposal.noCount++;
        }

        if(proposal.yesCount == 10) {
            (bool success, ) =proposal.target.call(proposal.data);
            require(success)
        }

        proposal.Votes[msg.sender] = _isSupporting ? VoteState.Yes : VoteState.No;
    }
}
