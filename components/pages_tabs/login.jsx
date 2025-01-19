import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({route}) => {
  const {role}=route.params;
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEntry = () => {
    navigation.navigate("ENTRY");
  };

  function handleMerchantSubmit(){
    console.log(email,password);
    const merchantData={
      email:email,
      password,
    }
    axios.post("https://blockpay1-new.onrender.com/merchantlogin",merchantData)
    .then((res)=>{
      console.log(res.data);
      if(res.data.status=='ok'){
      alert("Login Successfully");
      AsyncStorage.setItem('token', res.data.data);
      AsyncStorage.setItem('isLoggedIn',JSON.stringify(true));
      handleEntry();
      }else{
        alert("Incorrect Email or Password");
      }
    });
  }

  function handleUserSubmit(){
    console.log(email,password);
    const userData={
      email:email,
      password,
    }
    axios.post("https://blockpay1-new.onrender.com/userlogin",userData)
  .then((res)=>{
      console.log(res.data);
      if(res.data.status=='ok'){
      alert("Login Successfully");
      AsyncStorage.setItem('token', res.data.data);
      AsyncStorage.setItem('isLoggedIn',JSON.stringify(true));
      handleEntry();
      }else{
        alert("Incorrect Email or Password");
      }
    });
  }

 
 const handleSignup=()=>{
    if(role==0){
      navigation.navigate("SIGNUP",{role});
    }else{
      navigation.navigate("USERSIGNUP",{role});
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0072ff', '#00c6ff', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.background}
      >
    <View style={styles.innerContainer}>
      <Text style={styles.header}>Welcome Back!</Text>
      <Text style={styles.subHeader}>Login to your Blockpay account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => {
          if (!email||!password) {
            alert('Please fill in all required fields.');
          } else {
            // if(role==0){
            //   handleMerchantSubmit();
            // }
            // handleUserSubmit();
            handleEntry();
          }
        }}
      >
        <Text style={styles.nextButtonText}>Login →</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '85%',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    width: '90%',
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#555',
    fontSize: 14,
  },
  signupText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Login;
