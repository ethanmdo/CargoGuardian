import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
    await getRiskPrediction();
    navigation.navigate("Prediction", { predictionData: prediction });
  };

  return (
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

          <View style={styles.button}>
            <Button title="Predict Risk" onPress={press} color="#FFFFFF" />
          </View>
        </View>

        {prediction && (
          <Text style={styles.predictionText}>Risk: {prediction}</Text>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
