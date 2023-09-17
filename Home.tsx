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
<<<<<<< HEAD
import Poly from "./Poly";

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [shipmentContent, setShipmentContent] = useState<string>("");
  const [city, setCity] = useState<string>("");
=======

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [shipmentContent, setShipmentContent] = useState<string>("");
  const [route, setRoute] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
>>>>>>> backend
  const [prediction, setPrediction] = useState<string>("");

  const getRiskPrediction = async () => {
    try {
      const response = await axios.post<string>(
<<<<<<< HEAD
        "http://localhost:8081/predict-risk",
        {
          shipmentContent,
          cityConditions: city,
=======
        "http://localhost:8080/shipments/predict-risk",
        {
          shipmentContent,
          route,
          weatherConditions: weather,
>>>>>>> backend
        }
      );
      setPrediction(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };
<<<<<<< HEAD
  const getShipmentContent = async () => {
    try {
      const response = await axios.get<string>(
        "http://localhost:8081/predict-shipmentRisk"
      );
      setShipmentContent(response.data);
    } catch (error) {
      console.error("Error fetching shipment content:", error);
    }
  };
  const getCity = async () => {
    try {
      const response = await axios.get<string>(
        "http://localhost:8081/predict-weatherRisk"
      );
      setCity(response.data);
    } catch (error) {
      console.error("Error fetching city:", error);
    }
  };

  const press = async () => {
    await getShipmentContent();
    await getCity();

    if (!shipmentContent || !city) {
=======

  const press = async () => {
    if (!shipmentContent || !route || !weather) {
>>>>>>> backend
      alert("Please fill out all the boxes before proceeding.");
      return;
    }

<<<<<<< HEAD
    await getCity();
    navigation.navigate("Prediction", {
      predictionData: prediction,
      shipmentContent: shipmentContent,
      city: city,
    });
=======
    await getRiskPrediction();
    navigation.navigate("Prediction", { predictionData: prediction });
>>>>>>> backend
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
<<<<<<< HEAD
            <Text style={styles.inputCap}>
              Fragile, Food, Liquid: Format As "XX,XX,XX" And Should Add To 100
            </Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={(text) => setCity(text)}
            />
=======
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

>>>>>>> backend
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
