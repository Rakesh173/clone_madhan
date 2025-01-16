require('dotenv').config();

const { Web3 } = require('web3');

const apikey=process.env['apiKey'];
const network='Testnet C-Chain';

const node=`https://go.getblock.io/${apikey}/${network}/`

const web3=new Web3(node);
//console.log(web3);


const accountTo=web3.eth.accounts.create();
console.log(accountTo.address);
console.log(accountTo);


const accountFrom='0x4611153A4db6F32B4958d85f73d5cd2D6974Eb98';

//console.log(accountFrom);


const createSignedTx=async(rawTx)=>{
    rawTx.gas=await web3.eth.estimateGas(rawTx);
    return await accountFrom.signTransaction(rawTx);
}

const sendSignedTx=async(signedTx)=>{
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
}

const amountTo ="0.01" //Avax

const rawTx={
    to:accountTo.address,
    value:web3.utils.toWei(amountTo,"ether")
}

createSignedTx(rawTx).then(sendSignedTx)