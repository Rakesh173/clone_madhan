const mongoose=require('mongoose');

const merchantDetailSchema = new mongoose.Schema({
    businessName: { type: String},
    email: { type: String,unique: true },
    mobileNumber: { type: String},
    password: { type: String}, 
    govtid: { type: String},
    idnumber:{type:String},
    walletAddress: { type: String},
  },{Collection:"MerchantInfo"});

mongoose.model("MerchantInfo",merchantDetailSchema);





