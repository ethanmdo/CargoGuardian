import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Alert, TextInput } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [region, setRegion] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [originInput, setOriginInput] = useState(''); // For inputting origin
  const [destinationInput, setDestinationInput] = useState(''); // For inputting destination

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const checkRoute = async () => {
    if (!originInput.trim() || !destinationInput.trim()) {
      Alert.alert("Error", "Please provide both origin and destination.");
      return;
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originInput}&destination=${destinationInput}&traffic_model=pessimistic&key=AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00`;

    try {
      let result = await fetch(apiUrl);
      let json = await result.json();

      if (json.routes && json.routes.length > 0) {
        let points = json.routes[0].overview_polyline.points;
        let coords = decodePolyline(points);
        setRouteCoords(coords);

        const routeDistance = json.routes[0].legs[0].duration.value;
        const routeDurationTraffic = json.routes[0].legs[0].duration_in_traffic.value;
        const routeHighwayAvoidance = json.routes[0].legs[0].steps.some(step => step.maneuver === "ramp-right" || step.maneuver === "ramp-left");

        let damageScore = 0;

        if (routeDurationTraffic > routeDistance) {
          damageScore += 20;
        }

        if (routeHighwayAvoidance) {
          damageScore += 30;
        }

        Alert.alert(
          "Route Check",
          `Based on the route's traffic and road conditions, there's a ${damageScore}% chance of damage. Consider checking alternate routes!`
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
        <TextInput
          placeholder="Enter starting address"
          style={styles.textInput}
          onChangeText={text => setOriginInput(text)}
          value={originInput}
        />
        <TextInput
          placeholder="Enter destination address"
          style={styles.textInput}
          onChangeText={text => setDestinationInput(text)}
          value={destinationInput}
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 20,
    width: '90%',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    width: '48%',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '90%',
  },
});


