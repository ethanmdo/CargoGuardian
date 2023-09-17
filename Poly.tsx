import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
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
    latitude: 37.2296,
    longitude: 80.4139,
    latitudeDelta: 37.2296,
    longitudeDelta: 80.4139,
  });
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const [originInput, setOriginInput] = useState<string>("");
  const [destinationInput, setDestinationInput] = useState<string>("");

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
        latitudeDelta: 37.2296,
        longitudeDelta: 80.4139,
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

        const endDestination = json.routes[0].legs[0].end_location;

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
          riskScore -= 10;
        }

        if (routeHighwayAvoidance) {
          riskScore -= 20;
        }

        Alert.alert(
          "Route Check",
          `Based on the route's traffic and road conditions, there's a ${110 - riskScore
          }% chance of risk. Consider checking alternate routes!`
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
            autoFocus: false,
            returnKeyType: "next",
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setOriginInput(data.description);
          }}
          query={{
            key: "AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00",
            language: "en",
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Enter destination address"
          minLength={2}
          textInputProps={{
            autoFocus: false,
            returnKeyType: "done",
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setDestinationInput(data.description);
          }}
          query={{
            key: "AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00",
            language: "en",
          }}
        />

        <TouchableOpacity style={styles.button} onPress={checkRoute}>
          <Text style={styles.buttonText}>Check Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    position: "absolute",
    bottom: 5,
    width: 350,
    alignSelf: "center",
    flexDirection: "column",
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF6B6B",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: "black",
    textAlign: "center",
  },
});
