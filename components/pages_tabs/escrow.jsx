import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { connectWallet, transferFunds } from './wallectconnect';

const escrowScreen=()=>{
    const navigation=useNavigation();
    const senderAddress="0x4611153A4db6F32B4958d85f73d5cd2D6974Eb98";
    const upiId="agentprofessor29@oksbi";

    const executeTransaction = async () => {
        try {
          if (!toAddress || !amount) {
            alert('Please provide both address and amount');
            return;
          }
    
          // Connect to wallet and get the web3 instance
          const { web3, senderAddress } = await connectWallet(privateKey);
    
          if (!web3 || !senderAddress) {
            alert('Wallet connection failed.');
            return;
          }
    
          // Perform the fund transfer
          await transferFunds(web3, privateKey, toAddress, amount);
    
          
          handleConfirm();
    
        } catch (error) {
          console.error('Error executing transaction:', error);
          handleFailed();
        }
      };
}


export default escrowScreen;