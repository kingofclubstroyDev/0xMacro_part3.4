// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token  is ERC20{

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){

        _mint(msg.sender, 1000000 ether);
    }

}
