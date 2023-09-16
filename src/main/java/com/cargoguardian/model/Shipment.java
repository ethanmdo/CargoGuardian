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


}
