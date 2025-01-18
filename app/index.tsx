import SignPageScreen from '@/components/pages_tabs/sign_page';
import Signup from '@/components/pages_tabs/signup';
import Login from '@/components/pages_tabs/login';
import BlockPayStep2 from '@/components/pages_tabs/identity';
import CryptoSetup from '@/components/pages_tabs/cryptosetup';
import Homepage from '@/components/pages_tabs/homepage';
import ProfilePage from '@/components/pages_tabs/profile';
import UserSignup from '@/components/pages_tabs/usersignup';
import TransactionHistory from '@/components/pages_tabs/transaction_history';
import TransferScreen from '@/components/pages_tabs/transfer';
import TransactionScreen from '@/components/pages_tabs/confirmation';
import CheckBalance from '@/components/pages_tabs/checkbalance';
import QRCamera from '@/components/pages_tabs/qrscanner';
import TransactionFailedScreen from '@/components/pages_tabs/failed';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React,{useState,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import {Link} from 'expo-router';

const Stack = createNativeStackNavigator();

export default function TabOneScreen() {

  // const [isLoggedIn,setIsLoggedIn]=useState(false);

  // async function getData(){
  //   const data=await AsyncStorage.getItem('isLoggedIn');
  //   console.log(data);
  //   setIsLoggedIn(true);
  // }

  // useEffect(()=>{
  //   getData();
  // })

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"HOME"} component={SignPageScreen} options={{headerShown:false}}/>
        <Stack.Screen name={"SIGNUP"} component={Signup} />
        <Stack.Screen name={"LOGIN"} component={Login}/>
        <Stack.Screen name={"IDENTITY"} component={BlockPayStep2}/>
        <Stack.Screen name={"CRYPTO"} component={CryptoSetup}/>
        <Stack.Screen name={"ENTRY"} component={Homepage}/>
        <Stack.Screen name={"PROFILE"} component={ProfilePage}/>
        <Stack.Screen name={"TRANSACTION"} component={TransactionHistory}/>
        <Stack.Screen name={"USERSIGNUP"} component={UserSignup}/>
        <Stack.Screen name={"TRANSFER"} component={TransferScreen}/>
        <Stack.Screen name={"CONFIRMATION"} component={TransactionScreen}/>
        <Stack.Screen name={"BALANCE"} component={CheckBalance}/>
        <Stack.Screen name={"CAMERAQR"} component={QRCamera}/>
        <Stack.Screen name={"FAILEDSCREEN"} component={TransactionFailedScreen}/>
      </Stack.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  }
});
