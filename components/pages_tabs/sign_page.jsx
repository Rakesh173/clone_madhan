import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import SwitchSelector from "react-native-switch-selector";
import { LinearGradient } from 'expo-linear-gradient';

const SignPageScreen = () => {
    const [role, setRole] = React.useState('');
    const navigation = useNavigation();
    const handleSignup = () => {
        navigation.navigate("SIGNUP",{role});
      };
      const handleLogin = () => {
        navigation.navigate("LOGIN",{role});
      };
      const handleUserSignPage=()=>{
        navigation.navigate("USERSIGNUP",{role});
      };
      const roleoptions = [
        { label: "Merchant", value: "0" },
        { label: "User", value: "1" }
      ];
      console.log(role);
    return (
        <LinearGradient
        colors={['#0072ff', '#00c6ff', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.background}
      >
        <View style={styles.container}>
            <Text style={styles.headerText}>
                With Blockpay, Crypto is not just a Currency - it's a lifestyle
            </Text>
            <LottieView
                source={require('../../assets/images/Animation - 1737092584813.json')}
                    autoPlay loop = {true}
                
                style={styles.image}
            />
            <SwitchSelector
            options={roleoptions}
            initial={0}
            style={styles.toggleContainer}
            buttonColor= {'#007AFF'}
            onPress={value=>setRole(value)}
            />
            <TouchableOpacity 
                style={styles.signUpButton} onPress={()=>role==0? handleSignup('SIGNUP'):handleUserSignPage('USERSIGNUP')}>
                <Text style={styles.signUpButtonText}>Sign up →</Text>
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
            >
                <Text style={styles.loginbuttonText}>Login →</Text>
            </TouchableOpacity>
        </View>
    </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    background:{
        flex:1,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 30,
    },
    toggleContainer: {
        flexDirection: 'row',
        width: '80%',
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        padding: 5,
        marginBottom: 30,
    },
    signUpButton: {
        backgroundColor: '#007AFF',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 60,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 60,
        alignItems: 'center',
    },
    loginbuttonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    signUpButtonText: {
        color: '#fff',
        transition: 'all 0.3s ease-in-out',
    },
    toggleButtonInactive: {
        backgroundColor: '#fff',
        color: '#6A5ACD',
        transition: 'all 0.3s ease-in-out',
    },
});

export default SignPageScreen;
