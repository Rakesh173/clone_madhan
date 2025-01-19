import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { LinearGradient } from 'expo-linear-gradient';

const ProfilePage = () => {
  const navigation = useNavigation();

  const handleTransfer = () => {
    navigation.navigate("TRANSFER");
  };

  const handleHomepage = () => {
    navigation.navigate("ENTRY");
  };

  // const [merchantData,setMerchantData]=useState('');

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

  // useEffect(()=>{
  //   getData();
  // },[]);

  // // Genrating UPI ID
  // if (!merchantData.email) {
  //   console.error("Email is undefined");
  //   return;
  // }

  // const mail=merchantData.email
  // const upiID=mail.split('@')[0]+'@bp'+Math.floor(Math.random() * 1000);

  return (
    <View contentContainerStyle={styles.container}>
      <LinearGradient
      colors={['#0072ff', '#00c6ff', '#ffffff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.background}
      >
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleHomepage}>
          <Image
            source={require('../../assets/images/left-arrow.png')}
            style={styles.topContainerImg}
          />
        </TouchableOpacity>
        {/* <Text style={styles.topContainerText}>Profile</Text> */}
      </View>
      </LinearGradient>
      
    <View style={styles.middlecontainer}>
    <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.webp')}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          {/* <Text style={styles.profileName}>{merchantData.govtid}</Text> */}
          <Text style={styles.verifiedText}>Verified Merchant</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Business Name</Text>
        {/* <Text style={styles.label}>{merchantData.businessName}</Text> */}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Wallet Address</Text>
        {/* <Text style={styles.label}>{merchantData.walletAddress}</Text> */}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>UPI ID</Text>
        {/* <Text style={styles.infoText}>{upiID}</Text> */}
      </View>
      <View style={styles.infoContainer}>
        <QRCode
          // value={merchantData.walletAddress}
          size={220}
        />
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handleTransfer}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
    
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // background: {
  //   flex: 1,
  // },
  topContainer: {
    height: 250,
  },
  topContainerImg: {
    position: 'absolute',
    right: 150,
    width: 30,
    height: 30,
    borderRadius: 50,
    top: 50,
    left: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    bottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginRight: 20,
    bottom: 110,
    borderWidth: 2,
    borderColor: '#fff',

  },
  middlecontainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  profileDetails: {
    flexDirection: 'column',
    bottom: 115,
    left: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    bottom: 10,
  },
  verifiedText: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
    bottom: 10,
    right: 10,
  },
  infoContainer: {
    backgroundColor: '#fff', // White background for a clean look
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Subtle shadow for depth
    marginBottom: 15, // Spacing between containers
    bottom: 110,
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#888', // Subtle color for labels
    marginBottom: 5, // Space between label and its corresponding value
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Darker color for emphasis
    marginBottom: 10, // Space between text blocks
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    bottom: 110,
    left: 20,

  },
  label: {
    fontSize: 15,
    color: '#888',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
    bottom: 110,
  },
  payButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 40,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    bottom: 110,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfilePage;

