// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./ERC20.sol";

contract Otts is ERC20 {

    constructor() ERC20("Otts", "OTTs") {}

    function crearTokens() public {
        _mint(msg.sender, 100000000);
    }
}
