import React, { useState, useEffect, useRef } from "react";
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
import { TransitionPresets } from "@react-navigation/stack";
import * as Font from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import MapView, { Polyline } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

interface Coordinate {
  latitude: number;
  longitude: number;
}

function decodePolyline(encoded: string) {
  let index = 0,
    lat = 0,
    lng = 0,
    coordinates: Coordinate[] = [],
    shift = 0,
    result = 0,
    byte: number | null = null,
    latitude_change: number,
    longitude_change: number;

  while (index < encoded.length) {
    byte = null;
    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = result & 1 ? ~(result >> 1) : result >> 1;
    shift = result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push({ latitude: lat / 100000.0, longitude: lng / 100000.0 });
  }

  return coordinates;
}

export default function Poly() {
  const [region, setRegion] = useState({
    latitude: 37.78825, // default latitude
    longitude: -122.4324, // default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const [originInput, setOriginInput] = useState<string>(""); // For inputting origin
  const [destinationInput, setDestinationInput] = useState<string>(""); // For inputting destination

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922, // You might want to adjust these deltas
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const checkRoute = async () => {
    if (!originInput.trim() || !destinationInput.trim()) {
      Alert.alert("Error", "Please provide both origin and destination.");
      return;
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originInput}&destination=${destinationInput}&traffic_model=pessimistic&departure_time=now&key=AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00`;

    try {
      let result = await fetch(apiUrl);
      let json = await result.json();

      if (json.routes && json.routes.length > 0) {
        let points = json.routes[0].overview_polyline.points;
        let coords = decodePolyline(points);
        setRouteCoords(coords);

        // Extract the destination coordinates from the API response
        const endDestination = json.routes[0].legs[0].end_location;

        // Adjust the map's view to focus on the destination coordinates
        setRegion({
          latitude: endDestination.lat,
          longitude: endDestination.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        const routeDistance = json.routes[0].legs[0].duration.value;
        const routeDurationTraffic =
          json.routes[0].legs[0].duration_in_traffic.value;
        const routeHighwayAvoidance = json.routes[0].legs[0].steps.some(
          (step: any) =>
            step.maneuver === "ramp-right" || step.maneuver === "ramp-left"
        );

        let riskScore = 100;

        if (routeDurationTraffic > routeDistance) {
          riskScore -= 20;
        }

        if (routeHighwayAvoidance) {
          riskScore -= 30;
        }

        Alert.alert(
          "Route Check",
          `Based on the route's traffic and road conditions, there's a ${riskScore}% chance of risk. Consider checking alternate routes!`
        );
      } else {
        Alert.alert("Error", "No route found. Please check the addresses.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
      </MapView>
      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          placeholder="Enter starting address"
          minLength={2}
          textInputProps={{
            autoFocus: false, // autofocus is set to false
            returnKeyType: "next", // when the user presses the "next" button on the keyboard, it can move to the next input
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // Handle starting address selection
            setOriginInput(data.description);
          }}
          query={{
            key: "AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00",
            language: "en",
          }}
          styles={{
            textInputContainer: {
              width: "100%",
            },
            description: {
              fontWeight: "bold",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Enter destination address"
          minLength={2}
          textInputProps={{
            autoFocus: false, // autofocus is set to false
            returnKeyType: "done", // indicates the user is done with input
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // Handle destination address selection
            setDestinationInput(data.description);
          }}
          query={{
            key: "AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00",
            language: "en",
          }}
          styles={{
            textInputContainer: {
              width: "100%",
            },
            description: {
              fontWeight: "bold",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Check Route" onPress={checkRoute} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 20,
    width: "90%",
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    width: "48%",
    borderRadius: 5,
  },
  buttonContainer: {
    width: "90%",
  },
});
