package com.cargoguardian.model;

public class Shipment {

    private int fragileContentPercentage;
    private int foodItemContentPercentage;
    private int liquidItemContentPercentage;

    // Constructor
    public Shipment(String input) {
        // Split the input string by comma
        String[] percentages = input.split(",");

        // Assuming the input is always correctly formatted as "##,##,##"
        if (percentages.length == 3) {
            this.fragileContentPercentage = Integer.parseInt(percentages[0].trim());
            this.foodItemContentPercentage = Integer.parseInt(percentages[1].trim());
            this.liquidItemContentPercentage = Integer.parseInt(percentages[2].trim());
        } else {
            // Handle error if input format is incorrect
            throw new IllegalArgumentException("Input string format should be '##,##,##'");
        }
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

        return Math.max(defaultScore, 0); // This ensures the score doesn't go below 0
    }
}