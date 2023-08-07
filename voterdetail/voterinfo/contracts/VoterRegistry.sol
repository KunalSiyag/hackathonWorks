// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoterRegistry {
    struct Voter {
        string name;
        uint256 voterId;
        uint8 age;
        string address_;
        string fatherName;
    }

    mapping(uint256 => Voter) public voters;
    uint256 public totalVoters;

    function addVoter(
        string memory _name,
        uint256 _voterId,
        uint8 _age,
        string memory _address,
        string memory _fatherName
    ) public {
        require(voters[_voterId].voterId == 0, "Voter with this ID already exists");

        voters[_voterId] = Voter({
            name: _name,
            voterId: _voterId,
            age: _age,
            address_: _address,
            fatherName: _fatherName
        });

        totalVoters++;
    }

    function getVoterDetails(uint256 _voterId) public view returns (Voter memory) {
        require(voters[_voterId].voterId != 0, "Voter not found");
        return voters[_voterId];
    }
}
