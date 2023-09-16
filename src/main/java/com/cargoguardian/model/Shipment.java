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

    public void setFragileContentPercentage(int newPercent)
    {
        this.liquidItemContentPercentage = newPercent;
    }


}
