package com.cargoguardian.controller;

import com.cargoguardian.model.Shipment;
import com.cargoguardian.model.Weather;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/shipments")
public class ShipmentController {

    private final List<Shipment> shipments = new ArrayList<>();

    @PostMapping
    public String createShipment(@RequestBody Shipment shipment) {
        shipments.add(shipment);
        return "Shipment created successfully";
    }

    @GetMapping("/predict-riskby")
    public Shipment getShipment(@PathVariable int id) {
        if (id >= 0 && id < shipments.size()) {
            return shipments.get(id);
        } else {
            throw new ShipmentNotFoundException("Shipment not found with id: " + id);
        }
    }
    @GetMapping("/predict-weatherRisk")
    public String getWeatherPrediction(@RequestParam String location) {
        String apiKey = "59786d29bea323a72ae2853ab7e40e91";
        String url = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=59786d29bea323a72ae2853ab7e40e91&units=metric";

        if (location == null)
        {
            url = "https://api.openweathermap.org/data/2.5/forecast?q=Blacksburg&appid=59786d29bea323a72ae2853ab7e40e91&units=metric";
        }

        try {
            RestTemplate restTemplate = new RestTemplate();

            URL weatherUrl = new URL(url);
            HttpURLConnection http = (HttpURLConnection)weatherUrl.openConnection();

            http.setRequestProperty("Accept", "application/json");
            http.setRequestProperty(
                HttpHeaders.AUTHORIZATION, String.format("Bearer %s", apiKey));

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);


            String responseBody = new String(Objects.requireNonNull(response.getBody()).getBytes(), StandardCharsets.UTF_8);

            JsonParser jsonParser = new JsonParser();

            JsonElement jsonObject = JsonParser.parseString(responseBody);

            JsonObject asJsonObject = jsonObject.getAsJsonObject();

            String weather = asJsonObject.get("list").getAsJsonArray().get(0).getAsJsonObject().get("weather").getAsJsonArray().get(0).getAsJsonObject().get("main").getAsString();


            // jsonArray is what you parse
            return "Weather: " + weather;

        } catch (Exception e) {
            throw new ShipmentNotFoundException("Shipment not found");
        }

    }

    @GetMapping("/predict-shipmentRisk")
    public ResponseEntity<String> getShipmentPrediction(@RequestParam int fragilePercentage, @RequestParam int foodPercentage, @RequestParam int liquidPercentage) {
        // Input validation
        if(fragilePercentage < 0 || fragilePercentage > 100 ||
            foodPercentage < 0 || foodPercentage > 100 ||
            liquidPercentage < 0 || liquidPercentage > 100) {
            return ResponseEntity.badRequest().body("Percentages should be between 0 and 100.");
        }

        try {
            Shipment inputShipment = new Shipment(fragilePercentage, foodPercentage, liquidPercentage);
            double safetyScore = inputShipment.getSafetyScore();
            return ResponseEntity.ok("Safety Score: " + safetyScore);
        } catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/predict-weatherScore")
    public ResponseEntity<Integer> getWeatherScore(@RequestParam String weatherDescription) {
        try {
            Weather weather = new Weather(weatherDescription);
            int weatherScore = weather.getWeatherScore();
            return ResponseEntity.ok(weatherScore);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(-1); // Error handling if needed
        }
    }

    @PutMapping("/{id}")
    public String updateShipment(@PathVariable int id, @RequestBody Shipment updatedShipment) {
        if (id >= 0 && id < shipments.size()) {
            shipments.set(id, updatedShipment);
            return "Shipment updated successfully";
        } else {
            throw new ShipmentNotFoundException("Shipment not found with id: " + id);
        }
    }
}
