package com.cargoguardian.controller;

import com.cargoguardian.model.Shipment;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/shipments")
public class ShipmentController {

    private final List<Shipment> shipments = new ArrayList<>();

    @PostMapping
    public String createShipment(@RequestBody Shipment shipment) {
        shipments.add(shipment);
        return "Shipment created successfully";
    }

    @GetMapping("/predict-risk")
    public Shipment getShipment(@PathVariable int id) {
        if (id >= 0 && id < shipments.size()) {
            return shipments.get(id);
        } else {
            throw new ShipmentNotFoundException("Shipment not found with id: " + id);
        }
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
