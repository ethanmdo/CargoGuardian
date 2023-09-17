package com.cargoguardian.controller;

import com.cargoguardian.model.Shipment;
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

    @PostMapping("/predict-weatherRisk")
    public String getWeatherPrediction(@RequestBody String location) {
        String apiKey = "59786d29bea323a72ae2853ab7e40e91";
        String url = "https://api.openweathermap.org/data/2.5/forecast?q=" + location
                + "&appid=59786d29bea323a72ae2853ab7e40e91&units=metric";

        if (location == null) {
            url = "https://api.openweathermap.org/data/2.5/forecast?q=Blacksburg&appid=59786d29bea323a72ae2853ab7e40e91&units=metric";
        }

        try {
            RestTemplate restTemplate = new RestTemplate();

            URL weatherUrl = new URL(url);
            HttpURLConnection http = (HttpURLConnection) weatherUrl.openConnection();

            http.setRequestProperty("Accept", "application/json");
            http.setRequestProperty(
                    HttpHeaders.AUTHORIZATION, String.format("Bearer %s", apiKey));

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            String responseBody = new String(Objects.requireNonNull(response.getBody()).getBytes(),
                    StandardCharsets.UTF_8);

            JsonParser jsonParser = new JsonParser();

            JsonElement jsonObject = JsonParser.parseString(responseBody);

            JsonObject asJsonObject = jsonObject.getAsJsonObject();

            String weather = asJsonObject.get("list").getAsJsonArray().get(0).getAsJsonObject().get("weather")
                    .getAsJsonArray().get(0).getAsJsonObject().get("main").getAsString();

            // jsonArray is what you parse
            return "Weather: " + weather;

        } catch (Exception e) {
            throw new ShipmentNotFoundException("Shipment not found");
        }

    }

    @PostMapping("/predict-shipmentRisk")
    public String getShipmentPrediction(@RequestParam String input) {
        Shipment inputShipment = new Shipment(input);

        return String.valueOf(inputShipment.getSafetyScore());
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
