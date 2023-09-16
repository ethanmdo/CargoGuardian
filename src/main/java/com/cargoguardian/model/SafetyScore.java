package com.cargoguardian.model;

public class SafetyScore{
    
    private Shipment s;
    private WeatherCond w;
    private RoadCond r;

    public SafetyScore(Shipment s, WeatherCond w, RoadCond r)
    {
        this.s = s;
        this.w = w;
        this.r = r;
    }

    public Shipment getShipmentScore()
    {
        return this.s.getSafetyScore();
    }

    public WeatherCond getWeatherConditionsScore()
    {
        return this.w.getSafetyScore();
    }

    public RoadCond getRoadConditionsScore()
    {
        return this.r.getSafetyScore();
    }

}
