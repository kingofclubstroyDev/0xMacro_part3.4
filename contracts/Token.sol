// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token {

    string public name = "Token";
    string public symbol = "TKN";

    uint public totalSupply = 1000000 ether;

    mapping(address => uint) balances;

    uint decimals = 18;


    constructor() {

        balances[msg.sender] = totalSupply;

    }

    function transfer(address to, uint amount) external {

        require(balances[msg.sender] >= amount, "Not enough tokens");

        balances[msg.sender] -= amount;

        balances[to] += amount;

    }

    function balanceOf(address account) external view returns(uint) {
        return balances[account];
    }

}
