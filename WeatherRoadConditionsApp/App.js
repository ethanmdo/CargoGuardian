import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function DetailedWeatherPage({ route }) {
  const { selectedDay, forecastData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detailed Weather for {selectedDay}</Text>
      <FlatList
        data={forecastData}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.detailedForecastItem}>
            <Text>Time: {item.dt_txt.split(' ')[1]}</Text>
            <Text>Temperature: {item.main.temp}°C</Text>
            <Text>Weather: {item.weather[0].description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [apiKey, setApiKey] = useState('59786d29bea323a72ae2853ab7e40e91'); // Ideally, replace with your OpenWeather API key from environment variables or secured storage.
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (!apiKey) {
      Alert.alert('Error', 'Please set your OpenWeather API key.');
    }
  }, [apiKey]);

  const fetchWeatherForecast = async () => {
    if (!city) {
      Alert.alert('Error', 'Please enter a city.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Weather data not available for this location. ${errorText}`);
      }

      const data = await response.json();

      const next5Days = data.list.filter((forecast, index) => index % 8 === 0);

      setForecastData(next5Days);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      Alert.alert('Error', 'Unable to fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
                value={city}
                onChangeText={setCity}
              />
              <Button title="Fetch Weather" onPress={fetchWeatherForecast} />
              
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                forecastData
                  .filter((_, index) => index % 8 === 0)
                  .map((forecast, index) => {
                    const day = forecast.dt_txt.split(' ')[0];
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          handleDayClick(day);
                          props.navigation.navigate('DetailedWeather', {
                            selectedDay: day,
                            forecastData: forecastData.filter(
                              (item) => item.dt_txt.split(' ')[0] === day
                            ),
                          });
                        }}
                        style={[
                          styles.forecastItem,
                          selectedDay === day && styles.selectedDay,
                        ]}
                      >
                        <Text>Date: {day}</Text>
                        <Text>Time: {forecast.dt_txt.split(' ')[1]}</Text>
                        <Text>Temperature: {forecast.main.temp}°C</Text>
                        <Text>Weather: {forecast.weather[0].description}</Text>
                      </TouchableOpacity>
                    );
                  })
              )}
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="DetailedWeather" component={DetailedWeatherPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
  },
  forecastContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  forecastItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedDay: {
    backgroundColor: 'lightblue',
  },
  selectedDayText: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailedForecastItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
