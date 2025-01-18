import React,{useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Linking,ScrollView,Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
//import LottieView from 'lottie-react-native';

const CryptoSetup = ({route}) => {
  const {businessName,email,mobileNumber,password,role,govtid,idnumber}=route.params;

  const navigation = useNavigation();
  const handleLogin = () => {
      navigation.navigate("LOGIN",{role});
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [walletAddress,setWalletAddress]=useState('');
  const [items, setItems] = useState([
    {label: 'Avax', value: 'Avax'},
    {label: 'USDT', value: 'USDT'},
    {label: 'LINK', value: 'LINK'},
    {label:'USDC', value:'USDC'},
    {label:'BEAM', value:'BEAM'}
  ]);

  function handleMerchantSubmit(){
    const merchantData={
      businessName,
      email,
      mobileNumber,
      password,
      govtid,
      idnumber,
      walletAddress,
    }
      axios.post("http://192.168.30.1:5001/merchantregister",merchantData)
    .then((res)=>{
      console.log(res.data);
      if(res.data.status== 'Ok'){
        alert('Registered Successfully');
        handleLogin();
      }else{
        alert(JSON.stringify(res.data));
      }
    }).catch((e)=>{
      console.log(e);
    })
  }

  function handleUserSubmit(){
    const merchantData={
      businessName,
      email,
      mobileNumber,
      password,
      govtid,
      idnumber,
      walletAddress,
    }
      axios.post("http://192.168.30.1:5001/userregister",merchantData)
    .then((res)=>{
      console.log(res.data);
      if(res.data.status== 'Ok'){
        alert('User Registered Successfully');
        handleLogin();
      }else{
        alert(JSON.stringify(res.data));
      }
    }).catch((e)=>{
      console.log(e);
    })
  }

  return (
    <LinearGradient
        colors={['#0072ff', '#00c6ff', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.background}
      >
    <View style={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.header}>BlockPay in 3 Steps</Text>
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>Business Details</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>Verify your Identity</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
        <View style={[styles.step,styles.activeStep]}>
          <Text style={styles.activeNumber}>3</Text>
          <Text style={styles.activeText}>Crypto Setup</Text>
        </View>
      </View>
      <Text style={styles.subHeader}>3. Crypto Setup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your crypto wallet address"
        placeholderTextColor="#999"
        editable={true}
        onChangeText={setWalletAddress}
      />
      <DropDownPicker
        placeholder="Select your Crypto Coins"
        open={open}
        style={styles.input}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(val) => {
          if (val && val.length === 0) {
            alert('Please fill in all required fields.');
            return;
          }
          setValue(val);
        }}
        setItems={setItems}
        multiple={true}
        min={1}
        max={items.length-1}
        mode="BADGE"
      />
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>Added Crypto Coins:</Text>
        {value && value.map((coin, index) => (
          <Text key={index} style={{marginLeft: 10, marginTop: 5}}>
            • {items.find(item => item.value === coin)?.label}
          </Text>
        ))}
      </View>
      <TouchableOpacity>
        <Text style={styles.link}>Want to Pick Top Coins ? <Text onPress={() => Linking.openURL('https://coinmarketcap.com/trending-cryptocurrencies/')} style={styles.headlink}>Know More →</Text></Text>
      </TouchableOpacity>
      {/* <View>
        <LottieView 
        source={require ('../../assets/images/Animation - 1736915214227.json')} 
        autoPlay loop ={true}
        style = {styles.illustration} 
        />
      </View> */}
      <TouchableOpacity style={styles.finishButton} onPress={() => {
            if (!walletAddress || !value
            ) {
              alert('Please fill in all required fields.');
            } else {
              if(role==0){
                handleMerchantSubmit();
              }
              handleUserSubmit();
            }
          }}>
        <Text style={styles.finishButtonText}>Register Now</Text>
      </TouchableOpacity>
    </View>
    </View>
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
  illustration: {
    width: '100%',
    height: 200,
  },
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  step: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    width: '28%',
    backgroundColor: '#f0f0f0',
  },
  activeStep: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  activeNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepText: {
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'center',
  },
  activeText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButton:{
    alignItems:'center',
      backgroundColor: '#007AFF',
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 30,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  },
  finishButtonText:{
    alignItems:'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});

export default CryptoSetup;

