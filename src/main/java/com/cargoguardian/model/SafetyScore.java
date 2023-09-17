//package com.cargoguardian.model;
//
//public class SafetyScore{
//
//    private Shipment s;
//    private WeatherCond w;
//    private RoadCond r;
//
//    public SafetyScore(Shipment s, WeatherCond w, RoadCond r)
//    {
//        this.s = s;
//        this.w = w;
//        this.r = r;
//    }
//
//    public double getShipmentScore()
//    {
//        return this.s.getSafetyScore();
//    }
//
//    public double getWeatherConditionsScore()
//    {
//        return this.w.getSafetyScore();
//    }
//
//    public double getRoadConditionsScore()
//    {
//        return this.r.getSafetyScore();
//    }
//
//    public double overallSafetyScoreOutput()
//    {
//        double shipmentSafetyScore = this.getShipmentScore();
//        double weatherConditionScore = this.getWeatherConditionsScore();
//        double roadConditionScore = this.getRoadConditionsScore();
//
//        if (shipmentSafetyScore < 0 || shipmentSafetyScore > 100 ||
//            weatherConditionScore < 0 || weatherConditionScore > 100 ||
//            roadConditionScore < 0 || roadConditionScore > 100) {
//            throw new IllegalArgumentException("Scores must be between 0 and 100.");
//        }
//
//        double shipmentWeight = 0.5;
//        double weatherWeight = 0.25;
//        double roadWeight = 0.25;
//
//        double overallSafetyScore = (shipmentSafetyScore * shipmentWeight) + (weatherConditionScore * weatherWeight) + (roadConditionScore * roadWeight);
//
//        return overallSafetyScore;
//    }
//}
