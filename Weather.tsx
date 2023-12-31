import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: { temp: number };
  weather: [{ description: string }];
}

export default function Weather() {
  const [apiKey, setApiKey] = useState<string>(
    "59786d29bea323a72ae2853ab7e40e91"
  );
  const [city, setCity] = useState<string>("");
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDayData, setSelectedDayData] = useState<ForecastItem[] | null>(
    null
  );

  useEffect(() => {
    if (!apiKey) {
      Alert.alert("Error", "Please set your OpenWeather API key.");
    }
  }, [apiKey]);

  const fetchWeatherForecast = async () => {
    if (!city) {
      Alert.alert("Error", "Please enter a city.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Weather data not available for this location. ${errorText}`
        );
      }

      const data = await response.json();
      const next5Days: ForecastItem[] = data.list.filter(
        (forecast: ForecastItem, index: number) => index % 8 === 0
      );

      setForecastData(next5Days);
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
      Alert.alert("Error", "Unable to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDayClick = (day: string) => {
    const dataForSelectedDay = forecastData.filter(
      (item) => item.dt_txt.split(" ")[0] === day
    );
    setSelectedDayData(dataForSelectedDay);
  };

  if (selectedDayData) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Detailed Weather for {selectedDayData[0].dt_txt.split(" ")[0]}
        </Text>
        <FlatList
          data={selectedDayData}
          keyExtractor={(item) => item.dt.toString()}
          renderItem={({ item }) => (
            <View style={styles.detailedForecastItem}>
              <Text>Time: {item.dt_txt.split(" ")[1]}</Text>
              <Text>Temperature: {item.main.temp}°C</Text>
              <Text>Weather: {item.weather[0].description}</Text>
            </View>
          )}
        />
        <Button title="Back" onPress={() => setSelectedDayData(null)} />
      </View>
    );
  }

  return (
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
        forecastData.map((forecast, index) => {
          const day = forecast.dt_txt.split(" ")[0];
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleDayClick(day)}
              style={styles.forecastItem}
            >
              <Text>Date: {day}</Text>
              <Text>Time: {forecast.dt_txt.split(" ")[1]}</Text>
              <Text>Temperature: {forecast.main.temp}°C</Text>
              <Text>Weather: {forecast.weather[0].description}</Text>
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Align content at the start
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "90%",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#ccc",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  forecastContainer: {
    width: "100%",
    marginTop: 15,
    alignItems: "center",
  },
  forecastItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "rgba(173, 216, 230, 0.3)",
    width: "100%",
    shadowColor: "#aaa",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  selectedDay: {
    backgroundColor: "#add8e6",
  },
  selectedDayText: {
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  detailedForecastItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#aaa",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
