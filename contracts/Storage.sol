// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Storage {
    uint256 x = 97; //0x0
    uint256 y = 54; //0x1

    //keccak256(key + 0x2)
    mapping (uint => uint) storingMap; //0x2

    uint256 z = 20; //0x3

    bool b = true; //0x4 package
    uint8 public c = 0xff; //0x4 package with b; whatever public ou não

    function getB() external view returns(bool){
       return b;
    }

    uint256[3] s = [10, 22, 303];
    uint256[] v;

    constructor() {
        //keccak256(0 + 0x2)
        storingMap[0] = 1;
        //keccak256(1 + 0x2)
        storingMap[1] = 2;

        v.push(10);
        v.push(0xf1092);
    }
}
