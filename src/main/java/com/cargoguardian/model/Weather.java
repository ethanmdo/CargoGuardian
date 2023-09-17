package com.cargoguardian.model;

public class Weather {

    private String weatherDescription;

    // Constructor
    public Weather(String weatherDescription) {
        this.weatherDescription = weatherDescription;
    }

    // Getter and Setter for weatherDescription
    public String getWeatherDescription() {
        return weatherDescription;
    }

    public void setWeatherDescription(String weatherDescription) {
        this.weatherDescription = weatherDescription;
    }

    // Method to get the weather score
    public int getWeatherScore() {
        String lowerCaseWeather = weatherDescription.toLowerCase();

        if (lowerCaseWeather.contains("clear") || lowerCaseWeather.contains("sunny")) {
            return 100;
        } else if (lowerCaseWeather.contains("cloudy")) {
            return 80;
        } else if (lowerCaseWeather.contains("rainy") || lowerCaseWeather.contains("snowy")) {
            return 30;
        } else if (lowerCaseWeather.contains("stormy")) {
            return 10;
        } else {
            return 50; // default score for unpredicted cases
        }
    }

}
