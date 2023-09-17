import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Alert, TextInput } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

function decodePolyline(encoded) {
  let index = 0, lat = 0, lng = 0, coordinates = [], shift = 0, result = 0, byte = null, latitude_change, longitude_change;

  while (index < encoded.length) {
    byte = null;
    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1F) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    shift = result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1F) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push({ latitude: lat / 100000.0, longitude: lng / 100000.0 });
  }

  return coordinates;
}



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

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originInput}&destination=${destinationInput}&traffic_model=pessimistic&departure_time=now&key=AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00`;

    try {
      let result = await fetch(apiUrl);
      let json = await result.json();

      if (json.routes && json.routes.length > 0) {
        let points = json.routes[0].overview_polyline.points;
        let coords = decodePolyline(points);
        setRouteCoords(coords);

        const routeDistance = json.routes[0].legs[0].duration.value;
        const routeDurationTraffic = json.routes[0].legs[0].duration_in_traffic.value;
        const routeHighwayAvoidanceAndConstruction = json.routes[0].legs[0].steps.some(step => step.maneuver === "ramp-right" || step.maneuver === "ramp-left");

        let safteyScore = 100;

        if (routeDurationTraffic > routeDistance) {
          riskScore -= 10;
        }

        if (routeHighwayAvoidanceAndConstruction) {

          riskScore -= 10;
        }

        Alert.alert(
          "Route Check",
          `Based on the route's traffic and road conditions, there's a ${safteyScore}% chance of risk. Consider checking alternate routes!`
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
    autoFocus={false}
    returnKeyType={'default'}
    fetchDetails={true}
    onPress={(data, details = null) => {
      // Handle starting address selection
      setOriginInput(data.description);  // Update the originInput state with the selected address description
    }}
    
    query={{
      key: 'AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00',
      language: 'en',
    }}
    styles={{
      textInputContainer: {
        width: '100%',
      },
      description: {
        fontWeight: 'bold',
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
    }}
  />
  <GooglePlacesAutocomplete
    placeholder="Enter destination address"
    minLength={2}
    autoFocus={false}
    returnKeyType={'default'}
    fetchDetails={true}
    onPress={(data, details = null) => {
      // Handle destination address selection
      setDestinationInput(data.description);  // Update the destinationInput state with the selected address description
    }}
    
    query={{
      key: 'AIzaSyAjFs26wQSTwsjVvRu6LTYugLOJb6n0i00',
      language: 'en',
    }}
    styles={{
      textInputContainer: {
        width: '100%',
      },
      description: {
        fontWeight: 'bold',
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
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


