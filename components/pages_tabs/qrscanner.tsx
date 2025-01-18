import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import React, { useRef, useEffect, useState } from "react";
import {
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  AppState,
  View,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ParamListBase } from '@react-navigation/routers';

type TransferScreenParams = {
  qrData: string;
}

type RootStackParamList = {
  TRANSFER: TransferScreenParams;
};

type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'TRANSFER'>,
  NativeStackNavigationProp<ParamListBase>
>;

const QRCamera=()=> {
  const qrLock = useRef(false);
  const appstate = useRef(AppState.currentState);
  const lineAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProps>();
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active" && appstate.current === "inactive") {
        qrLock.current = false;
      }
      appstate.current = nextState;
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Animate the scanning line
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineAnimation, {
          toValue: Dimensions.get("window").width * 0.7,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(lineAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [lineAnimation]);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data.startsWith("0x")) {
      if (!qrLock.current) {
        qrLock.current = true;
        setScannedData(data);
        setTimeout(() => {
          qrLock.current = false;
          navigation.navigate("TRANSFER", { qrData: data });
        }, 500);
      }
    } else {
      if (!qrLock.current) {
        qrLock.current = true;
        alert("Invalid QR Code");
        setTimeout(() => {
          qrLock.current = false;
        }, 10000);
      }
    }
  };

  return (
    <SafeAreaView style={styles.abs}>
      <Stack.Screen options={{ title: "QR Scanner", headerShown: false }} />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      <CameraView
        style={styles.abs}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      >
        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Scanner box */}
          <View style={styles.scannerBox}>
            {/* Animated scanning line */}
            <Animated.View
              style={[
                styles.scannerLine,
                { transform: [{ translateY: lineAnimation }] },
              ]}
            />
          </View>

          {/* Hint text */}
          <Text style={styles.hintText}>Align the QR code within the frame</Text>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  abs: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scannerBox: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
  },
  scannerLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#00FF00",
    position: "absolute",
  },
  hintText: {
    marginTop: 20,
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default QRCamera;