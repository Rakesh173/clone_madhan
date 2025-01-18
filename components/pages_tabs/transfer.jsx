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
import { useNavigation,useRoute } from "@react-navigation/native";
import Web3 from 'web3';
const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/325bd28639c9484381b3b0dba697aebb");
const web3 = new Web3(provider);
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransferScreen = () => {
  // const {qrData}=route.params;
  // console.log(qrData);
  const navigation = useNavigation();
  const [selectedCoin, setSelectedCoin] = useState("avalanche");
  const [inrAmount, setInrAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  const handleTransaction = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      navigation.navigate("CONFIRMATION");
    }, 1000); // Simulate API call or processing time
  };

  // const [userData,setUserData]=useState('');

  // //Getting Merchant Data

  // async function getData(){
  //   const token=await AsyncStorage.getItem('token');
  //   console.log(token);
  //   axios.post('http://192.168.30.1:5001/userdata',{token:token})
  //   .then((res)=>{
  //     console.log(res.data);
  //     setUserData(res.data.data);
  //   });
  // }

  // useEffect(()=>{
  //   getData();
  // },[]);

  // Fetch live crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=avalanche,tether,usdcoin,chainlink&vs_currencies=inr"
        );
        setCryptoPrices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto prices: ", error);
        Alert.alert("Error", "Unable to fetch crypto prices. Please try again.");
      }
    };
    fetchPrices();
  }, []);

  // Recalculate crypto amount
  useEffect(() => {
    if (inrAmount && selectedCoin && cryptoPrices[selectedCoin]) {
      const conversionRate = cryptoPrices[selectedCoin].inr;
      setCryptoAmount((parseFloat(inrAmount) / conversionRate).toFixed(8));
    } else {
      setCryptoAmount(0);
    }
  }, [inrAmount, selectedCoin, cryptoPrices]);

  // Getting Merchant Data 

  // useEffect(()=>{
  //   getData();
  // },[]);

  const coins = [
    { id: "avalanche", name: "Avalanche (AVAX)", icon: "avalanche"},
    { id: "tether", name: "Tether (USDT)", icon: "tether" },
    { id: "usdcoin", name: "USD Coin (USDC)", icon: "usdcoin"},
    { id: "chainlink", name: "Chainlink (LINK)", icon: "chainlink"},
  ];

  const handleInputChange = (text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      setInrAmount(text);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Fetching live crypto prices...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transfer Crypto</Text>
      <Text style={styles.subtitle}>Select a Coin</Text>
      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.coinCard,
              selectedCoin === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedCoin(item.id)}
          >
            <Image source={item.icon} style={styles.coinIcon} />
            <Text
              style={[
                styles.coinText,
                selectedCoin === item.id && styles.selectedCoinText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter INR Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inrAmount}
          onChangeText={handleInputChange}
          placeholder="Enter amount in INR"
        />
        <View style={styles.conversionRow}>
          <Text style={styles.cryptoLabel}>
            {cryptoAmount} {selectedCoin.toUpperCase()}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={handleTransaction }
      >
      <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6200ee",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#6200ee",
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  coinCard: {
    flex: 1,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: "#6200ee",
    elevation: 6,
    shadowColor: "#6200ee",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  coinIcon: {
    width: 32,
    height: 32,
  },
  coinText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  selectedCoinText: {
    color: "#fff",
    fontWeight: "700",
  },
  inputContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    marginBottom: 15,
  },
  conversionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cryptoLabel: {
    fontSize: 16,
    color: "#6200ee",
    fontWeight: "600",
  },
  payButton: {
    marginTop: 30,
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  loadingText: {
    fontSize: 18,
    color: "#6200ee",
    textAlign: "center",
  },
});

export default TransferScreen;
