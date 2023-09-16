import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Prediction from "./Prediction";
import { TransitionPresets } from '@react-navigation/stack';


const Stack = createStackNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: { backgroundColor: "#181818" },
            headerTintColor: "white",
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="Prediction"
          component={Prediction}
          options={{
            headerStyle: { backgroundColor: "#181818" },
            headerTintColor: "white",
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
