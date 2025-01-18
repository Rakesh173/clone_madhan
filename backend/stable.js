const { Web3 } = require('web3');
// Define the ERC-20 contract ABI
const ERC20_ABI = [
    {
        constant: false,
        inputs: [{ name: "_to", type: "address" }, { name: "_value", type: "uint256" }],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
];

// Stablecoin contract address (e.g., USDT on Ethereum Mainnet)
const STABLECOIN_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// Function to send stablecoin
const sendStableCoin = async (toAddress, amount, privateKey) => {
    try {
        // Initialize the stablecoin contract
        const stablecoinContract = new Web3.eth.Contract(ERC20_ABI, STABLECOIN_ADDRESS);

        // Get the sender's address from the private key
        const account = Web3.eth.accounts.privateKeyToAccount(privateKey);
        const senderAddress = account.address;

        // Encode the transfer function data
        const transferData = stablecoinContract.methods.transfer(toAddress, amount).encodeABI();

        // Estimate gas
        const gas = await Web3.eth.estimateGas({
            from: 0x2e4A7C8d6412b32bBb2Ae6Fa083Fda67B8d2dc92,
            to: STABLECOIN_ADDRESS,
            data: transferData,
        });

        // Fetch current gas price
        const gasPrice = await Web3.eth.getGasPrice();

        // Create the transaction object
        const tx = {
            from: senderAddress,
            to: STABLECOIN_ADDRESS,
            data: transferData,
            gas,
            gasPrice,
        };

        // Sign the transaction
        const signedTx = await Web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the signed transaction
        const receipt = await Web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log("Stablecoin sent successfully!");
        console.log("Transaction receipt:", receipt);

    } catch (error) {
        console.error("Error sending stablecoin:", error.message);
    }
};

// Main Execution
(async () => {
    try {
        // Amount to send in smallest unit (e.g., for USDT, use 6 decimals)
        const stableCoinAmount = Web3.utils.toWei("10", "mwei"); // 10 USDT
        const recipientAddress = "0x2e4A7C8d6412b32bBb2Ae6Fa083Fda67B8d2dc92"; // Replace with the correct address
        const privateKey = "0x3254be89167f17195cd21f290bdee6fafcb801aa52b1b380220ddc69369562bc"; // Replace with your private key

        // Send stablecoin
        await sendStableCoin(recipientAddress, stableCoinAmount, privateKey);

    } catch (error) {
        console.error("Error in main execution:", error.message);
    }
})();
