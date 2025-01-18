// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionManager {
    event TransactionSent(address indexed from, address indexed to, uint256 value, uint256 gasUsed);

    // Function to check the balance of any address
    function getBalance(address addr) public view returns (uint256) {
        return addr.balance;
    }

    // Function to send Ether from the contract
    function sendFunds(address payable recipient) public payable {
        require(msg.value > 0, "Transaction value must be greater than zero");
        require(address(this).balance >= msg.value, "Insufficient contract balance");

        uint256 gasBefore = gasleft();
        (bool success, ) = recipient.call{value: msg.value}("");
        require(success, "Transaction failed");
        
        uint256 gasUsed = gasBefore - gasleft();
        emit TransactionSent(msg.sender, recipient, msg.value, gasUsed);
    }

    // Allow contract to receive Ether
    receive() external payable {}
}
