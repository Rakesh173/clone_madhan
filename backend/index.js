const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const app=express();
app.use(express.json());
app.use(cors());
require('dotenv').config();
const { Web3 } = require('web3');


const mongoUrl="mongodb+srv://Madhan94:Blockpay1@blockpay-register.4zidy.mongodb.net/?retryWrites=true&w=majority&appName=Blockpay-register";

const JWT_SECRET="jhsibibibuihuih98y3yuibvbhibeuifegohuibhibyifg8ehuiibhjkv[]iyge80y4gibvhib";

mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((e)=>{
    console.log(e);
})

require('./merchantDetails');
require('./userDetails');

const Merchant=mongoose.model("MerchantInfo");
const User=mongoose.model("UserInfo");

// Merchant Registration

app.post("/merchantregister",async (req,res)=>{
    const {businessName,email,mobileNumber,password,govtid,idnumber,walletAddress}=req.body;

    const oldMerchant=await Merchant.findOne({email:email})

    if(oldMerchant){
        return res.send({data:"User Already Exists"});
    }

    const encryptedPassword=await bcrypt.hash(password,10);

    try{
        await Merchant.create({
            businessName,
            email,
            mobileNumber,
            password:encryptedPassword,
            govtid,
            idnumber,
            walletAddress,
        })
        res.send({status:"Ok",data:"Merchant Created Successfully"});
    }catch(error){
        res.send({status:"error",data:error});
    }
})

// User Registration

app.post("/userregister",async (req,res)=>{
    const {businessName,email,mobileNumber,password,govtid,idnumber,walletAddress}=req.body;

    const oldUser=await User.findOne({email:email})

    if(oldUser){
        return res.send({data:"User Already Exists"});
    }

    const encryptedPassword=await bcrypt.hash(password,10);

    try{
        await User.create({
            businessName,
            email,
            mobileNumber,
            password:encryptedPassword,
            govtid,
            idnumber,
            walletAddress,
        })
        res.send({status:"Ok",data:"User Created Successfully"});
    }catch(error){
        res.send({status:"error",data:error});
    }
})

// Merchant Login

app.post("/merchantlogin",async (req,res)=>{
    const {email,password}=req.body;
    const existMerchant=await Merchant.findOne({email:email});

    if(!existMerchant){
        return res.send({data:"User Already Exists"});
    }

    if(await bcrypt.compare(password,existMerchant.password)){
        const token=jwt.sign({email:existMerchant.email},JWT_SECRET);
        console.log(token);
        if(res.status(201)){
            return res.send({status:"ok",data:token});
        }else{
            return res.send({error:"error"});
        }
    }
});

// User Login

app.post("/userlogin",async (req,res)=>{
    const {email,password}=req.body;
    const existUser=await User.findOne({email:email});

    if(!existUser){
        return res.send({data:"User Already Exists"});
    }

    if(await bcrypt.compare(password,existUser.password)){
        const token=jwt.sign({email:existUser.email},JWT_SECRET);
        console.log(token);
        if(res.status(201)){
            return res.send({status:"ok",data:token});
        }else{
            return res.send({error:"error"});
        }
    }
});

// Getting Merchant Data

app.post("/merchantdata",async (req,res)=>{
    const {token}=req.body;
    try{
        const merchant=jwt.verify(token,JWT_SECRET);
        const merchantemail=merchant.email;

        Merchant.findOne({email:merchantemail}).then((data)=>{
            return res.send({status:"Ok",data:data});
        })
    }catch(error){
        return res.send({error:"error"});
    }
})

// Getting User Data

app.post("/userdata",async (req,res)=>{
    const {token}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const useremail=user.email;

        User.findOne({email:useremail}).then((data)=>{
            return res.send({status:"Ok",data:data});
        })
    }catch(error){
        return res.send({error:"error"});
    }
})


// Getting Merchant Details by Wallet Address

app.post('/merchantdata', async (req, res) => {
    try {
        const { walletAddress } = req.params;

        // Find merchant by wallet address
        const merchant = await Merchant.findOne({ walletAddress });

        if (!merchant) {
            return res.status(404).json({ error: 'Merchant not found' });
        }

        return res.json(merchant);
    } catch (error) {
        console.error("Error fetching merchant details:", error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// Crypto Transactions

const web3 = new Web3(process.env.infuraUrl);

app.post('/transfer', async (req, res) => {
    const { senderWallet, receiverWallet, Amount } = req.body;

    if (!process.env.infuraUrl || !process.env.privateKey) {
        console.error('Missing INFURA_URL or PRIVATEKEY in .env file');
        process.exit(1);
    }
    
    try {
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
        
                const balance = await web3.eth.getBalance(senderWallet);
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
            await checkBalance(senderWallet);
        
            const amount = web3.utils.toWei(Amount, 'ether');
            const rawTx = {
                from: senderWallet,
                to: receiverWallet,
                value: amount,
            };
        
            const signedTx = await createSignedTx(rawTx);
            await sendSignedTx(signedTx);
        })();

        // Return success response
        res.status(200).json({ success: true, transactionHash: receipt.transactionHash });

    } catch (error) {
        console.error("Transaction error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Starting the Server

app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 5001,()=>{
    console.log("Server is connected to the Port No "+process.env.X_ZOHO_CATALYST_LISTEN_PORT)
});




