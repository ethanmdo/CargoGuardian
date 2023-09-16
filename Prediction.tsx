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
          <View style={styles.circle}>
            <Text style={styles.circleText}>{topPercentage}%</Text>
          </View>
        </View>
        <View style={styles.bottomCirclesContainer}>
          {percentages.map((percentage, index) => (
            <View key={index} style={styles.circle}>
              <Text style={styles.circleText}>{percentage}</Text>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Prediction;
