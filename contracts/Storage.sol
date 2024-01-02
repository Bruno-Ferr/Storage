// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Storage {
    uint256 x = 97; //0x0
    uint256 y = 54; //0x1

    //keccak256(key + 0x2)
    mapping (uint => uint) storingMap; //0x2

    constructor() {
        //keccak256(0 + 0x2)
        storingMap[0] = 1;
        //keccak256(1 + 0x2)
        storingMap[1] = 2;
    }

    uint256 z = 20; //0x3

    bool b = true; //0x4 package
    uint8 c = 0xff; //0x4 package with b
}
