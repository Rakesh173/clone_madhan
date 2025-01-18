import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const BlockPayStep2 = ({route}) => {
  const { businessName, email, mobileNumber, password,role} = route.params;
  const navigation = useNavigation();

  const [govtid, setGovtid] = useState('');
  const [idnumber, setIdnumber] = useState('');

  const handleCrypto = () => {
    navigation.navigate('CRYPTO', {
      businessName,
      email,
      mobileNumber,
      password,
      role,
      govtid,
      idnumber,
    });
  };

  return (
    <LinearGradient
        colors={['#0072ff', '#00c6ff', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.background}
      >
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
      <Text style={styles.header}>BlockPay in 3 Steps - {businessName}</Text>
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Business Details</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={[styles.step,styles.activeStep]}>
            <Text style={styles.activeNumber}>2</Text>
            <Text style={styles.activeText}>Verify your Identity</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Crypto Setup</Text>
          </View>
        </View>
      <Text style={styles.subHeader}>2. Verify your Identity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name as per GOVT ID *"
        value={govtid}
        onChangeText={setGovtid}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Aadhar/PAN Card Number *"
        maxLength={12}
        onChangeText={setIdnumber}
        value={idnumber}
      />

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (!govtid || !idnumber) {
            alert('Please fill all the required fields');
          } else {
            handleCrypto();
          }
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </View>
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
});

export default BlockPayStep2;