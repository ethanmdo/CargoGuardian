import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { styles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageBackground } from "react-native";

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [shipmentContent, setShipmentContent] = useState<string>("");
  const [route, setRoute] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [prediction, setPrediction] = useState<string>("");

  const getRiskPrediction = async () => {
    try {
      const response = await axios.post<string>(
        "http://localhost:8081/predict-risk",
        {
          shipmentContent,
          route,
          weatherConditions: weather,
        }
      );
      setPrediction(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const press = async () => {
    if (!shipmentContent || !route || !weather) {
      alert("Please fill out all the boxes before proceeding.");
      return;
    }

    await getRiskPrediction();
    navigation.navigate("Prediction", { predictionData: prediction });
  };

  return (
    <ImageBackground
      source={require("./assets/yellow.jpg")}
      style={styles.background}
    >
      <View style={styles.whole}>
        <View style={styles.container}>
          <Text style={styles.title}>Cargo Guardian</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Shipment Content"
              value={shipmentContent}
              onChangeText={(text) => setShipmentContent(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Route"
              value={route}
              onChangeText={(text) => setRoute(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Weather Conditions"
              value={weather}
              onChangeText={(text) => setWeather(text)}
            />

            <TouchableOpacity style={styles.button} onPress={press}>
              <Text style={styles.buttonText}>Predict Risk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
