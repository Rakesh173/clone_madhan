async function main() {
    const [deployer] = await ethers.getSigners();

    if (!deployer) {
        throw new Error("Deployer account not found. Check your Hardhat configuration.");
    }

    console.log("Deployer Address:", deployer.address);

    const BlockPay = await ethers.getContractFactory("BlockPay");
    const blockPay = await BlockPay.deploy();
    console.log("BlockPay deployed to:", blockPay.address);
}

main().catch((error) => {
    console.error("Deployment failed:", error.message);
    process.exit(1);
});
