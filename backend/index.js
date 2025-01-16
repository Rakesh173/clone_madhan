const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const QRCode = require('qrcode')
const axios=require('axios');
const app=express();
app.use(express.json());
app.use(cors());
const port =5001;

const mongoUrl="mongodb+srv://Madhan94:Blockpay1@blockpay-register.4zidy.mongodb.net/?retryWrites=true&w=majority&appName=Blockpay-register";

const JWT_SECRET="jhsibibibuihuih98y3yuibvbhibeuifegohuibhibyifg8ehuiibhjkv[]iyge80y4gibvhib";

mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((e)=>{
    console.log(e);
})

require('./merchantDetails');
const Merchant=mongoose.model("MerchantInfo");

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

// Generating Unique QR Code 

app.post('/generateqr', async (req, res) => {
    const { walletAddress } = req.body;
  
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }
  
    const qrData = `https://yourapp.com/payment?walletAddress=${walletAddress}`;
    try {
      const qrCode = await QRCode.toDataURL(qrData);
      res.status(200).json({ qrCode });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate QR code', details: err.message });
    }
  });


// Starting the Server

app.listen(port,()=>{
    console.log("Server is connected to the Port No "+port)
});




















// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt=require('bcrypt');
// const bodyParser = require('body-parser');
// const app = express();

// const port = 3001;

// app.set('view engiene','ejs');

// // Start the server
// app.listen(port, () => {
//     console.log("Server is running on port " + port);
// });

// app.use(bodyParser.json());

// mongoose.connect('mongodb+srv://Madhan84:Madhanpay@blockpay.eymag.mongodb.net/Blockpay-Users').then(() => {
//     console.log('MongoDB connected successfully.');
// }).catch((err) => {
//     console.error('MongoDB connection error:', err.message);
// });

// // Define the merchant schema
// const merchantSchema = new mongoose.Schema({
//     businessName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phoneNumber: { type: String, required: true },
//     password: { type: String, required: true }, // Hash this in production
//     fullName: { type: String, required: true },
//     govtId: { type: String, required: true },
//     walletAddress: { type: String, required: true },
//     preferredCryptoCoins: { type: [String], required: true },
// }, { timestamps: true });

// // Create the model
// const Merchant = mongoose.model('Merchant', merchantSchema);

// // Define the route for adding a merchant
// app.post('/add-merchant', async (req, res) => {
//     try {
//         const {
//             businessName,
//             email,
//             phoneNumber,
//             password,
//             fullName,
//             govtId,
//             walletAddress,
//             preferredCryptoCoins,
//         } = req.body;

//         const newMerchant = new Merchant({
//             businessName,
//             email,
//             phoneNumber,
//             password,
//             fullName,
//             govtId,
//             walletAddress,
//             preferredCryptoCoins,
//         });

//         await newMerchant.save();
//         res.status(201).json({ message: 'Merchant registered successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to register merchant.', details: error.message });
//     }
// });




