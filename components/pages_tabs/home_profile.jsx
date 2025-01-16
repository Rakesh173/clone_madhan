import React,{useEffect,useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useRoute,useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';


const QRCodeGenerator = () => {
  const navigation=useNavigation();
  const handlePr=()=>{
    navigation.navigate("PROFILE");
  }
  const handleQRCodePress = () => {
    Linking.openURL('http://localhost:8082/PROFILE'); 
  };
  const [merchantData,setMerchantData]=useState('');

  //Getting Merchant Data

  async function getData(){
    const token=await AsyncStorage.getItem('token');
    console.log(token);
    axios.post('http://192.168.30.1:5001/merchantdata',{token:token})
    .then((res)=>{
      console.log(res.data);
      setMerchantData(res.data.data);
    });
  }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BusinessName: {merchantData.businessName}</Text>
      <Text style={styles.username}>Email: {merchantData.email}</Text>
      <Text style={styles.wallet}>Wallet Address: {merchantData.walletAddress}</Text>

      <View style={styles.qrCodeContainer}>
        <QRCode
          value='http://localhost:8082/PROFILE'
          size={220}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePr}>
        <Text style={styles.buttonText}>Download QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePr}>
        <Text style={styles.buttonText}>Share QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    marginTop: 10,
    fontSize: 18,
  },
  wallet: {
    marginTop: 5,
    fontSize: 16,
  },
  upi: {
    marginTop: 5,
    fontSize: 16,
  },
  qrCodeContainer: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default QRCodeGenerator;
