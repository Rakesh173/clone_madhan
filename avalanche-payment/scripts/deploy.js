const hre = require("hardhat");

async function main() {
    const TransactionManager = await hre.ethers.getContractFactory("TransactionManager");
    const transactionManager = await TransactionManager.deploy();
    await transactionManager.deployed();

    console.log("TransactionManager deployed to:", transactionManager.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

