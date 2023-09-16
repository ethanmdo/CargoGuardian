import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Prediction from "./Prediction";
import Poly from "./Poly";
import { TransitionPresets } from "@react-navigation/stack";
import * as Font from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const Stack = createStackNavigator();
const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        Poppins_400Regular,
        Poppins_700Bold,
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="Prediction"
            component={Prediction}
            options={{
              headerTransparent: true,
              headerTintColor: "black",
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen name="Poly" component={Poly} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
