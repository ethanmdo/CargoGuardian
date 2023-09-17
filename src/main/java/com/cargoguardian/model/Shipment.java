package com.cargoguardian.model;

public class Shipment {

    private int fragileContentPercentage;
    private int foodItemContentPercentage;
    private int liquidItemContentPercentage;

    // Constructor
    public Shipment(int fragilePercent, int foodPercent, int liquidPercent) {
        this.fragileContentPercentage = fragilePercent;
        this.foodItemContentPercentage = foodPercent;
        this.liquidItemContentPercentage = liquidPercent;
    }

    // Getters and Setters
    public int getFragileContentPercentage() {
        return fragileContentPercentage;
    }

    public void setFragileContentPercentage(int fragileContentPercentage) {
        this.fragileContentPercentage = fragileContentPercentage;
    }

    public int getFoodItemContentPercentage() {
        return foodItemContentPercentage;
    }

    public void setFoodItemContentPercentage(int foodItemContentPercentage) {
        this.foodItemContentPercentage = foodItemContentPercentage;
    }

    public int getLiquidItemContentPercentage() {
        return liquidItemContentPercentage;
    }

    public void setLiquidItemContentPercentage(int liquidItemContentPercentage) {
        this.liquidItemContentPercentage = liquidItemContentPercentage;
    }

    // Safety score method
    public double getSafetyScore() {
        if (getFragileContentPercentage() + getFoodItemContentPercentage() + getLiquidItemContentPercentage() != 100) {
            throw new IllegalArgumentException("Please ensure the percentages sum up to 100");
        }

        double defaultScore = 100.0;
        defaultScore -= getFragileContentPercentage() * 0.5;
        defaultScore -= getFoodItemContentPercentage() * 0.15;
        defaultScore -= getLiquidItemContentPercentage() * 0.15;

        return Math.max(defaultScore, 0);  // This ensures the score doesn't go below 0
    }
}