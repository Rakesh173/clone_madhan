import Web3 from 'web3';
import { CONTRACT_ABI, contract_address } from './abi/contractConfig';

if (!global.crypto) {
  global.crypto = {
    getRandomValues: (array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256); // Fill array with random values
      }
    },
  };
}

// Function to connect to the wallet
export const connectWallet = async (privateKey) => {
  try {
    const provider = new Web3.providers.HttpProvider("https://api.avax-test.network/ext/bc/C/rpc"); // Testnet RPC URL
    const web3 = new Web3(provider);

    const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(senderAccount);

    console.log('Connected Wallet Address:', senderAccount.address);

    return { web3, senderAddress: senderAccount.address };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

// Function to get the balance from the contract
export const getBalance = async (web3, senderAddress) => {
  try {
    if (!web3) throw new Error('Web3 instance not initialized');
    const contract = new web3.eth.Contract(CONTRACT_ABI, contract_address);

    const balance = await contract.methods.getBalance().call({ from: senderAddress });
    return web3.utils.fromWei(balance, 'ether'); // Convert to human-readable AVAX
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};

// Function to transfer funds
export const transferFunds = async (web3, privateKey, toAddress, amountInAVAX) => {
  try {
    if (!web3) {
      throw new Error('Web3 instance not initialized');
    }

    const contract = new web3.eth.Contract(CONTRACT_ABI, contract_address);

    // Convert AVAX amount to Wei
    const amountInWei = web3.utils.toWei(amountInAVAX.toString(), 'ether');

    // Get the sender address from the private key
    const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;

    // Create the transaction data
    const txData = contract.methods
      .transferFunds(toAddress, amountInWei) // Call the transferFunds method
      .encodeABI();

    // Get the current gas price and nonce
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(senderAddress);

    // Build the transaction object
    const txObject = {
      from: senderAddress,
      to: toAddress,
      value: amountInWei, // Specify the value in the transaction (amount of AVAX to send)
      gas: 200000, // Estimate the gas limit or set manually
      gasPrice,
      nonce,
      data: txData,
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Transaction successful:', receipt);
    return receipt;
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

