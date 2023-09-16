package com.cargoguardian.model;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.TravelMode;

public class RoadCond { 
    private String conditionName;
    private int conditionSeverity; // You can define severity based on road conditions

    public RoadCond(String conditionName) {
        this.conditionName = conditionName;
        // You can set conditionSeverity based on the conditionName or the API response.
        this.conditionSeverity = determineSeverityFromAPI(conditionName);
    }

    private int determineSeverityFromAPI(String conditionName) {
        try {
            // Use Google Maps API to fetch road condition data (traffic)
            GeoApiContext context = new GeoApiContext.Builder().apiKey("YOUR_GOOGLE_MAPS_API_KEY").build();
            DirectionsApiRequest request = DirectionsApi.getDirections(context, conditionName, conditionName)
                    .mode(TravelMode.DRIVING);

            DirectionsResult result = request.await();
            // Extract relevant road condition data and calculate severity as needed

            return /* Calculate severity based on data from DirectionsResult */;
        } catch (Exception e) {
            e.printStackTrace();
            return 0; // Default severity in case of an error
        }
    }

    public int getConditionSeverity() {
        return conditionSeverity;
    }
}
