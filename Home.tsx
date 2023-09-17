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
import Poly from "./Poly";

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [shipmentContent, setShipmentContent] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [prediction, setPrediction] = useState<string>("");

  // const getRiskPrediction = async () => {
  //   try {
  //     const response = await axios.post<string>(
  //       "http://localhost:8081/predict-risk",
  //       {
  //         shipmentContent,
  //         cityConditions: city,
  //       }
  //     );
  //     setPrediction(response.data);
  //   } catch (error) {
  //     console.error("Error fetching prediction:", error);
  //   }
  // };
  const getShipmentScore = async () => {
    try {
    const response = await fetch(
    `http://localhost:8081/shipments/predict-shipmentRisk`,
    {
    method: "POST",
    headers: {
    "Content-Type": "text/plain",
    },
    body: shipmentContent, // Assuming shipmentContent holds the string
    }
    );
    
    
    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    
    const shipmentScore = await response.text(); // Parse the plain text response
    
    
    // Set the shipment score state
    setShipmentContent(shipmentScore);
    } catch (error) {
    console.error("Error fetching shipment score:", error);
    }
    };
    
  // const getCity = async () => {
  //   try {
  //     const response = await axios.get<string>(
  //       "http://localhost:8081/fetch-city"
  //     );
  //     setCity(response.data);
  //   } catch (error) {
  //     console.error("Error fetching city:", error);
  //   }
  // };

  const press = async () => {
    await getShipmentScore();
    //await getCity();

    if (!shipmentContent || !city) {
      alert("Please fill out all the boxes before proceeding.");
      return;
    }

    //await getCity();
    navigation.navigate("Prediction", {
      predictionData: prediction,
      shipmentContent: shipmentContent,
      city: city,
    });
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
            <Text style={styles.inputCap}>
              Fragile, Food, Liquid: Format As "XX,XX,XX" And Should Add To 100
            </Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={(text) => setCity(text)}
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