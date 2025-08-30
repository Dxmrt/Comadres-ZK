// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdentityCommitmentRegistry {
    mapping(bytes32 => bool) public registered;
    event Registered(bytes32 indexed commitment, address indexed sender);

    function register(bytes32 commitment) external {
        require(!registered[commitment], "Already registered");
        registered[commitment] = true;
        emit Registered(commitment, msg.sender);
    }
}