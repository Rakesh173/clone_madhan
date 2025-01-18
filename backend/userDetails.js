const mongoose=require('mongoose');

const userDetailSchema = new mongoose.Schema({
    businessName: { type: String},
    email: { type: String,unique: true },
    mobileNumber: { type: String},
    password: { type: String}, 
    govtid: { type: String},
    idnumber:{type:String},
    walletAddress: { type: String},
  },{Collection:"UserInfo"});

mongoose.model("UserInfo",userDetailSchema);





