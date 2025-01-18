require('dotenv').config();
const { Web3 } = require('web3');
const web3 = new Web3(process.env.infuraUrl);

if (!process.env.infuraUrl || !process.env.privateKey) {
    console.error('Missing INFURA_URL or PRIVATEKEY in .env file');
    process.exit(1);
}

web3.eth.net.isListening()
    .then(() => console.log("Connected to Infura URL"))
    .catch((error) => {
        console.error("Error connecting to Infura URL:", error.message);
        process.exit(1);
    });

const accountTo = web3.eth.accounts.create();
console.log("Account to create:", accountTo);

const privateKey = process.env.privateKey;
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log("From address:", accountFrom.address);

const checkBalance = async (address) => {
    try {
        const balance = await web3.eth.getBalance(address);
        console.log(`Address: ${address}, Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        return balance;
    } catch (error) {
        console.error(`Error checking balance: ${error.message}`);
    }
};

const createSignedTx = async (rawTx) => {
    try {
        const gas = await web3.eth.estimateGas(rawTx);
        rawTx.gas = gas;

        const gasPrice = await web3.eth.getGasPrice();
        rawTx.gasPrice = gasPrice;

        const balance = await web3.eth.getBalance(accountFrom.address);
        const totalCost = BigInt(gas) * BigInt(gasPrice) + BigInt(rawTx.value);
        const balanceBN = BigInt(balance);

        console.log(`Current Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        console.log(`Gas Estimate: ${gas}, Gas Price: ${web3.utils.fromWei(gasPrice, 'gwei')} Gwei`);
        console.log(`Transaction Value: ${web3.utils.fromWei(rawTx.value, 'ether')} ETH`);
        console.log(`Total Cost (Gas + Value): ${web3.utils.fromWei(totalCost.toString(), 'ether')} ETH`);

        if (balanceBN < totalCost) {
            throw new Error(`Insufficient balance. Have: ${web3.utils.fromWei(balance, 'ether')} ETH, Need: ${web3.utils.fromWei(totalCost.toString(), 'ether')} ETH`);
        }

        return await accountFrom.signTransaction(rawTx);
    } catch (error) {
        console.error(`Error creating signed transaction: ${error.message}`);
        return null;
    }
};

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

(async () => {
    await checkBalance(accountFrom.address);

    const amount = web3.utils.toWei('0.002', 'ether');
    const rawTx = {
        from: accountFrom.address,
        to: accountTo.address,
        value: amount,
    };

    const signedTx = await createSignedTx(rawTx);
    await sendSignedTx(signedTx);
})();

// require('dotenv').config();
// const { Web3 } = require('web3');
// const axios = require('axios'); // Import axios for API calls
// const web3 = new Web3(process.env.INFURA_URL);

// // Check if connection is successful
// web3.eth.net.isListening()
//     .then(() => console.log("Connected to Infura URL"))
//     .catch((error) => {
//         console.error("Error connecting to Infura URL:", error.message);
//         process.exit(1); // Exit if connection fails
//     });

// // Private key of the sender account
// const privateKey = process.env.PRIVATEKEY; // Ensure this is in your .env file
// const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
// console.log("From address:", accountFrom.address);

// // Function to convert any coin to stablecoin using Binance API
// const convertToStableCoin = async (amount, fromCoin, stableCoin = 'USDT') => {
//     try {
//         // Fetch the current price of the fromCoin in terms of the stableCoin
//         const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${fromCoin}${stableCoin}`);
//         const price = parseFloat(response.data.price);

//         if (!price) {
//             throw new Error(`Price for ${fromCoin} to ${stableCoin} not found.`);
//         }

//         // Calculate the equivalent amount in stableCoin
//         const stableCoinAmount = amount * price;
//         console.log(`Converted ${amount} ${fromCoin} to ${stableCoinAmount} ${stableCoin}`);
//         return stableCoinAmount;

//     } catch (error) {
//         console.error("Error converting to stable coin:", error.message);
//     }
// };

// // // Create a function to create and sign the transaction

// // const createSignedTx = async (rawTx) => {
// //     try {
// //         // Estimate gas for the transaction
// //         const gas = await web3.eth.estimateGas(rawTx);
// //         rawTx.gas = gas;

// //         // Fetch the current gas price
// //         const gasPrice = await web3.eth.getGasPrice();
// //         rawTx.gasPrice = gasPrice;

// //         // Check if the sender has enough balance
// //         const balance = await web3.eth.getBalance(accountFrom.address);
// //         const totalCost = BigInt(gas) * BigInt(gasPrice) + BigInt(rawTx.value);
// //         const balanceBN = BigInt(balance);

// //         console.log(`Current Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
// //         console.log(`Gas Estimate: ${gas}, Gas Price: ${web3.utils.fromWei(gasPrice, 'gwei')} Gwei`);
// //         console.log(`Transaction Value: ${web3.utils.fromWei(rawTx.value, 'ether')} ETH`);
// //         console.log(`Total Cost (Gas + Value): ${web3.utils.fromWei(totalCost.toString(), 'ether')} ETH`);

// //         if (balanceBN < totalCost) {
// //             throw new Error(`Insufficient balance. Have: ${web3.utils.fromWei(balance, 'ether')} ETH, Need: ${web3.utils.fromWei(totalCost.toString(), 'ether')} ETH`);
// //         }

// //         // Sign the transaction
// //         const signedTx = await accountFrom.signTransaction(rawTx);
// //         return signedTx;

// //     } catch (error) {
// //         console.error("Error creating signed transaction:", error.message);
// //         return null;
// //     }
// // };

// // Create a Signed Transaction

// const createSignedTx = async (rawTx) => {
//     try {
//         // Estimate gas for the transaction
//         const gas = await web3.eth.estimateGas(rawTx);
//         rawTx.gas = gas;

//         // Fetch the current gas price
//         const gasPrice = await web3.eth.getGasPrice();
//         rawTx.gasPrice = gasPrice;

//         // Check if the sender has enough balance
//         const balance = await web3.eth.getBalance(accountFrom.address);
//         const totalCost = BigInt(gas) * BigInt(gasPrice) + BigInt(rawTx.value || 0);
//         const balanceBN = BigInt(balance);

//         console.log(`Current Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
//         console.log(`Gas Estimate: ${gas}, Gas Price: ${web3.utils.fromWei(gasPrice, 'gwei')} Gwei`);
//         console.log(`Transaction Value: ${web3.utils.fromWei(rawTx.value || '0', 'ether')} ETH`);
//         console.log(`Total Cost (Gas + Value): ${web3.utils.fromWei(totalCost.toString(), 'ether')} ETH`);

//         if (balanceBN < totalCost) {
//             throw new Error(`Insufficient balance. Have: ${web3.utils.fromWei(balance, 'ether')} ETH, Need: ${web3.utils.fromWei(totalCost.toString(), 'ether')} ETH`);
//         }

//         // Sign the transaction
//         const signedTx = await accountFrom.signTransaction(rawTx);
//         return signedTx;

//     } catch (error) {
//         console.error("Error creating signed transaction:", error.message);
//         return null;
//     }
// };


// // Function to send the signed transaction
// const sendSignedTx = async (signedTx) => {
//     if (!signedTx) {
//         console.log("No signed transaction found, cannot send.");
//         return;
//     }

//     try {
//         const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//         console.log("Transaction sent successfully:", receipt);
//     } catch (error) {
//         console.error("Error sending transaction:", error);
//     }
// };

// // Add this function before the main execution
// const checkBalance = async (address) => {
//     try {
//         const balance = await web3.eth.getBalance(address);
//         const balanceInEth = web3.utils.fromWei(balance, 'ether');
//         console.log(`Balance for ${address}: ${balanceInEth} ETH`);
//         return balance;
//     } catch (error) {
//         console.error("Error checking balance:", error.message);
//         throw error;
//     }
// };


// // Main execution
// (async () => {
//     // Check the sender's balance
//     await checkBalance(accountFrom.address);

//     // Convert the amount to stable coin first
//     const amountToConvert = 0.0001; // Amount of the coin to convert
//     const fromCoin = 'ETH'; // Coin to convert from (e.g., BTC, ETH)
//     const stableCoinAmount = await convertToStableCoin(amountToConvert, fromCoin);

//     // Define the transaction details
//     const recipientAddress = '0x5c01a4b3337D3dA660a3C7FDb72CCCeb2bcEe23f'; // Replace with actual recipient address
//     const rawTx = {
//         from: accountFrom.address, // Sender's address
//         to: recipientAddress, // Recipient's address
//         value: web3.utils.toWei(stableCoinAmount.toString(), 'ether'), // Convert amount to Wei
//         gas: 2000000, // Set a gas limit
//         gasPrice: await web3.eth.getGasPrice() // Fetch current gas price
//     };

//     // Create and send the transaction
//     const signedTx = await createSignedTx(rawTx);
//     await sendSignedTx(signedTx);
// })();