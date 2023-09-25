// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
// working

contract Game3 {
  bool public isWon;
  mapping(address => uint) public balances;

  function buy() payable external {
    balances[msg.sender] += msg.value;
  }

  function win(address addr1, address addr2, address addr3) external {
    require(balances[addr3] > 0, "Address 3 balance not enough");
    require(balances[addr2] > balances[addr1], "Address 2 balance not enough");
    require(balances[addr1] > balances[addr3], "Address 1 balance not enough");

    isWon = true;
  }
}