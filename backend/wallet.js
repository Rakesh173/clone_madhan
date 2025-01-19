require('dotenv').config();
const { Web3 } = require('web3');

// Connect to Fuji testnet via Infura
const web3 = new Web3(process.env.infuraUrl);

if (!process.env.infuraUrl || !process.env.privateKey) {
    console.error('Missing INFURA_URL or PRIVATEKEY in .env file');
    process.exit(1);
}

// Test network connection
web3.eth.net.isListening()
    .then(() => console.log("Connected to Fuji Testnet"))
    .catch((error) => {
        console.error("Error connecting to Fuji Testnet:", error.message);
        process.exit(1);
    });


// Extract "from" account using private key
const privateKey = process.env.privateKey;
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log("From address:", accountFrom.address);

// Check account balance
const checkBalance = async (address) => {
    try {
        const balance = await web3.eth.getBalance(address);
        console.log(`Address: ${address}, Balance: ${web3.utils.fromWei(balance, 'ether')} AVAX`);
        return balance;
    } catch (error) {
        console.error(`Error checking balance: ${error.message}`);
    }
};

// Create a signed transaction
const createSignedTx = async (rawTx) => {
    try {
        const gas = await web3.eth.estimateGas(rawTx);
        rawTx.gas = gas;

        const gasPrice = await web3.eth.getGasPrice();
        rawTx.gasPrice = gasPrice;

        const balance = await web3.eth.getBalance(accountFrom.address);
        const totalCost = BigInt(gas) * BigInt(gasPrice) + BigInt(rawTx.value);
        const balanceBN = BigInt(balance);

        console.log(`Current Balance: ${web3.utils.fromWei(balance, 'ether')} AVAX`);
        console.log(`Gas Estimate: ${gas}, Gas Price: ${web3.utils.fromWei(gasPrice, 'gwei')} Gwei`);
        console.log(`Transaction Value: ${web3.utils.fromWei(rawTx.value, 'ether')} AVAX`);
        console.log(`Total Cost (Gas + Value): ${web3.utils.fromWei(totalCost.toString(), 'ether')} AVAX`);

        if (balanceBN < totalCost) {
            throw new Error(`Insufficient balance. Have: ${web3.utils.fromWei(balance, 'ether')} AVAX, Need: ${web3.utils.fromWei(totalCost.toString(), 'ether')} AVAX`);
        }

        return await accountFrom.signTransaction(rawTx);
    } catch (error) {
        console.error(`Error creating signed transaction: ${error.message}`);
        return null;
    }
};

// Send the signed transaction
const sendSignedTx = async (signedTx) => {
    if (!signedTx) {
        console.log("No signed transaction found, cannot send.");
        return;
    }

    try {
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Transaction sent successfully:", receipt);
    } catch (error) {
        console.error("Error sending transaction:", error.message);
    }
};

// Main Function
(async () => {
    await checkBalance(accountFrom.address);

    const amount = web3.utils.toWei('0.001', 'ether'); // AVAX uses the same unit as Ether
    const rawTx = {
        from: accountFrom.address,
        to: "0x4611153A4db6F32B4958d85f73d5cd2D6974Eb98",
        value: amount,
    };

    const signedTx = await createSignedTx(rawTx);
    await sendSignedTx(signedTx);
})();