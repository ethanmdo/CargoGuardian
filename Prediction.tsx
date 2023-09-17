import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Poly from "./Poly";
import Home from "./Home";

type PredictionRouteParams = {
  predictionData: string;
  shipmentContent: string;
  route: string;
  city: string;
};

const Prediction: React.FC = ({ navigation }: any) => {
  const route =
    useRoute<RouteProp<{ Prediction: PredictionRouteParams }, "Prediction">>();
  const {
    predictionData,
    shipmentContent,
    route: shipmentRoute,
    city,
  } = route.params;

  const Stack = createStackNavigator();
  const navigateToPoly = () => {
    navigation.navigate("Poly");
  };

  const navigateToWeather = () => {
    navigation.navigate("Weather");
  };
  return (
    <ImageBackground
      source={require("./assets/yellow.jpg")}
      style={styles.background}
    >
      <View style={styles.circleContainer}>
        <View style={styles.topCircleContainer}>
          <Text style={styles.circleCaption}>Overall Score</Text>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{predictionData}</Text>
          </View>
        </View>

        <View style={styles.bottomCirclesContainer}>
          <View style={styles.capCircle}>
            <Text style={styles.bCircleCaption}>Shipment Content</Text>
            <TouchableOpacity onPress={navigateToPoly}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>{shipmentContent}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.capCircle}>
            <Text style={styles.bCircleCaption}>City Conditions</Text>

            <TouchableOpacity onPress={navigateToWeather}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>{city}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={navigateToWeather}>
            <Text style={styles.buttonText}>See Weather</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigateToPoly}>
            <Text style={styles.buttonText}>See Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Prediction;
