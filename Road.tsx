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
import Prediction from "./Prediction";
import Home from "./Home";

export default function Road() {
  return (
    <View style={styles.container}>
      <Text>Road Page</Text>
    </View>
  );
}
