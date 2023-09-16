package com.cargoguardian.model;

public class Shipment {

    private fragileContentPercentage;
    private foodItemContentPercentage;
    private liquidItemContentPercentage;
    
    public Shipment(int fragPercent, int foodPercent, int liquidPercent)
    {
        this.fragileContentPercentage = fragPercent;
        this.foodItemContentPercentage = foodPercent;
        this.liquidItemContentPercentage = liquidPercent;
    }

    public int getFragileContentPercentage()
    {
        return this.fragileContentPercentage;
    }

    public void setFragileContentPercentage(int newPercent)
    {
        this.fragileContentPercentage = newPercent;
    }

    public int getfoodItemContentPercentage()
    {
        return this.foodItemContentPercentage;
    }

    public void setfoodItemContentPercentage(int newPercent)
    {
        this.foodItemContentPercentageContentPercentage = newPercent;
    }

    public int getLiquidItemContentPercentage()
    {
        return this.liquidItemContentPercentage;
    }

    public void setLiquidItemContentPercentage(int newPercent)
    {
        this.liquidItemContentPercentage = newPercent;
    }

    public double getSafetyScore()
    {

        if (this.getFragileContentPercentage() + this.getfoodItemContentPercentage() + this.getLiquidItemContentPercentage() != 100)
        {
            throw new IllegalArgumentException("Please enter percentage values amounting to 100");
        }

        double defaultScore = 100.0;

        defaultScore = defaultScore - this.getFragileContentPercentage * 0.5;
        defaultScore = defaultScore - this.getfoodItemContentPercentage * 0.15;
        defaultScore = defaultScore - this.getLiquidItemContentPercentage * 0.15;

        if (defaultScore < 0)
        {
            defaultScore = 0;
        }

        return defaultScore;
    }



}
