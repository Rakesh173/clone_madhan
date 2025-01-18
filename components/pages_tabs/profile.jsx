import React,{useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const ProfilePage = () => {
  const navigation=useNavigation();
  const handleTransfer=()=>{
    navigation.navigate("TRANSFER");
  }
  const handlehomepage = () => {
    navigation.navigate("ENTRY");
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

  // Genrating UPI ID
  if (!merchantData.email) {
    console.error("Email is undefined");
    return;
  }

  const mail=merchantData.email
  const upiID=mail.split('@')[0]+'@bp'+Math.floor(Math.random() * 1000);

  // on scanning QR code

  // const handleQRCodeScanned = ({type,data} ) =>
  // {
  //   setScanned(true);
  //   setShouldAnimateExitingForTag(data);
  //   console.log('Type' + type + '\nData:' + data)
  // }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topcontainer}>
        <TouchableOpacity onPress={handlehomepage}>
            <Image source={require('../../assets/images/left-arrow.png')} style={styles.topcontainerimg}/>
            </TouchableOpacity>
            <Text style={styles.topcontainertext}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/bplogo.png')} // Replace with actual image URL
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{merchantData.govtid}</Text>
          <Text style={styles.verifiedText}>Verified Merchant</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Business Name</Text>
        <Text style={styles.label}>{merchantData.businessName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Wallet Address</Text>
        <Text style={styles.label}>{merchantData.walletAddress}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>UPI ID</Text>
        <Text style={styles.infoText}>{upiID}</Text>
      </View>
      <View style={styles.infoContainer}>
        <QRCode
          value={merchantData.walletAddress}
          size={220}
        />
      </View>
        <TouchableOpacity style={styles.payButton} onPress={handleTransfer}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  topcontainer: {
    height: 125,
    borderWidth:5,
    bordertopColor:'#007AFF',
    borderLeftColor:'#9fd3fc',
    borderBottomColor:'#9fd3fc',
    borderRightColor:'#9fd3fc',
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
},
topcontainerimg:{
    top: 45,
    left: 20,
    width: 30,
    height: 30,
    borderRadius:50,
},
topcontainertext:{
    top: 15,
    left: 175,
    fontSize: 20,
    color: '#fff',
},
  header: {
    marginBottom: 20,
  },
  profileText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileDetails: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  verifiedText: {
    fontSize: 16,
    color: 'green',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    // marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cryptoContainer: {
    marginBottom: 20,
    padding: 10,
  },
  cryptoIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cryptoIcon: {
    width: 50,
    height: 50,
  },
  payButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    top: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
