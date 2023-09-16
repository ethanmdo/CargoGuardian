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
  weather: string;
};

const Prediction: React.FC = ({ navigation }: any) => {
  const topPercentage = "25%";
  const percentages = ["50%", "75%", "100%"];

  const route =
    useRoute<RouteProp<{ Prediction: PredictionRouteParams }, "Prediction">>();
  const {
    predictionData,
    shipmentContent,
    route: shipmentRoute,
    weather,
  } = route.params;

  const Stack = createStackNavigator();
  const navigateToPoly = () => {
    navigation.navigate("Poly"); // "Road" should match the name of your "Road" screen in the navigator
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
            <Text style={styles.circleText}>{topPercentage}%</Text>
          </View>
        </View>
        <View style={styles.bottomCirclesContainer}>
          <View style={styles.capCircle}>
            <Text style={styles.bCircleCaption}>Shipment Content</Text>

            <View style={styles.circle}>
              <Text style={styles.circleText}>{shipmentContent}</Text>
            </View>
          </View>
          <View style={styles.capCircle}>
            <Text style={styles.bCircleCaption}>Route</Text>

            <View style={styles.circle}>
              <Text style={styles.circleText}>{shipmentRoute}</Text>
            </View>
          </View>
          <View style={styles.capCircle}>
            <Text style={styles.bCircleCaption}>Weather Conditions</Text>

            <TouchableOpacity onPress={navigateToPoly}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>{weather}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Prediction;
