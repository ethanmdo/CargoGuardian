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

    public int getShipmentScore()
    {
        return this.s.getSafetyScore();
    }

    public int getWeatherConditionsScore()
    {
        return this.w.getSafetyScore();
    }

    public int getRoadConditionsScore()
    {
        return this.r.getSafetyScore();
    }

    public int overallSafetyScoreOutput()
    {
        return 0;
    }
}
