require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); // Load environment variables from .env file

module.exports = {
    solidity: "0.8.0",
    networks: {
        fuji: {
            url: "https://api.avax-test.network/ext/bc/C/rpc", // Fuji RPC URL
            accounts: [process.env.PRIVATE_KEY], // Ensure PRIVATE_KEY is set in the .env file
        },
    },
};
