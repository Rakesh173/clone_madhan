import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
const TransactionFailedScreen = () => {
  const navigation=useNavigation();
  const handleConfirm=()=>{
    navigation.navigate("ENTRY");
  }
  const handleAgain=()=>{
    navigation.navigate("TRANSFER");
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.successText}>
          Your Transactions is <Text style={styles.amountText}>Failed</Text> to <Text style={styles.usernameText}>Madhan84</Text>.
        </Text>
        <View style={styles.checkmarkContainer}>
          <LottieView
          source={require('../../assets/images/Animation - 1737134293312.json')}
          autoPlay
          loop={true}
          style={styles.checkmark}
          />
        </View>
        <TouchableOpacity style={styles.payAgainButton} onPress={handleAgain}>
          <Text style={styles.payAgainButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1E88E5',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  checkmarkContainer: {
    marginBottom: 20,
  },
  checkmark: {
    width: 350,
    height: 350,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 40,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  amountText: {
    fontWeight: 'bold',
  },
  usernameText: {
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  payAgainButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
  },
  payAgainButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmButton: {
    borderColor: '#1E88E5',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  confirmButtonText: {
    color: '#1E88E5',
    fontSize: 16,
  },
});

export default TransactionFailedScreen;

