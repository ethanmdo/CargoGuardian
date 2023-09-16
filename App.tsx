import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";
import { styles } from "./styles"; // Import styles from the new file

const App: React.FC = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cargo Guardian</Text>
      </View>
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

        <Button title="Predict Risk" onPress={getRiskPrediction} />

        {prediction && (
          <Text style={styles.predictionText}>Risk: {prediction}</Text>
        )}
      </View>
    </View>
  );
};
