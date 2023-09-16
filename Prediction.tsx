import React from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { styles } from "./styles";

const Prediction: React.FC = () => {
  const topPercentage = "25%";
  const percentages = ["50%", "75%", "100%"];
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
              <Text style={styles.circleText}>{"0%"}</Text>
            </View>
          </View>
          <View style={styles.capCircle}>
            <Text style={styles.bCircleCaption}>Route</Text>
            <View style={styles.circle}>
              <Text style={styles.circleText}>{"0%"}</Text>
            </View>
          </View>
          <View style={styles.capCircle}>
            <Text style={styles.bCircleCaption}>Weather Conditions</Text>
            <View style={styles.circle}>
              <Text style={styles.circleText}>{"0%"}</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Prediction;
