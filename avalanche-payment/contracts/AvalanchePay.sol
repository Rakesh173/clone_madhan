// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockPay {
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    Transaction[] public transactions;

    event PaymentProcessed(address indexed from, address indexed to, uint256 amount);

    // Function to process payments
    function pay(address payable _to) external payable {
        require(msg.value > 0, "Payment amount must be greater than zero");

        _to.transfer(msg.value);
        transactions.push(Transaction(msg.sender, _to, msg.value, block.timestamp));

        emit PaymentProcessed(msg.sender, _to, msg.value);
    }

    // Function to get all transactions
    function getAllTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    // Function to get the balance of the contract
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Fallback function to accept AVAX
    receive() external payable {}
}

