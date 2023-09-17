import React from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute, RouteProp } from "@react-navigation/native";

type PredictionRouteParams = {
  predictionData: string;
  shipmentContent: string;
  route: string;
  weather: string;
};
const Prediction: React.FC = () => {
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

  const navigation = useNavigation();

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
            <View style={styles.circle}>
              <Text style={styles.circleText}>{weather}</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Prediction;