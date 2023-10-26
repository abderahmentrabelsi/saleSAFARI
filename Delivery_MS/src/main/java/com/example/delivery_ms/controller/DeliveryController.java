package com.example.delivery_ms.controller;

import com.example.delivery_ms.entity.Delivery;
import com.example.delivery_ms.service.DeliveryServiceImpl;
import com.example.delivery_ms.serviceInterface.IDeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600,allowCredentials = "true")
@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    @Autowired
    IDeliveryService deliveryService;

    // Get a list of all deliveries
    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries() {
        List<Delivery> deliveries = deliveryService.getAllDeliveries();
        return new ResponseEntity<>(deliveries, HttpStatus.OK);
    }

    // Get a specific delivery by ID
    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDeliveryById(@PathVariable Long id) {
        Delivery delivery = deliveryService.getDeliveryById(id);
        if (delivery != null) {
            return new ResponseEntity<>(delivery, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // Create a new delivery
    @PostMapping
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) {
        Delivery createdDelivery = deliveryService.createDelivery(delivery);
        return new ResponseEntity<>(createdDelivery, HttpStatus.CREATED);
    }

    // Update an existing delivery
    @PutMapping("/{id}")
    public ResponseEntity<Delivery> updateDelivery(@PathVariable Long id, @RequestBody Delivery delivery) {
        Delivery updatedDelivery = deliveryService.updateDelivery(id, delivery);
        if (updatedDelivery != null) {
            return new ResponseEntity<>(updatedDelivery, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a specific delivery by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable Long id) {
        if (deliveryService.deleteDelivery(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byName/{name}")
    public ResponseEntity<List<Delivery>> getDeliveriesByEmail(@PathVariable String name) {
        List<Delivery> deliveries = deliveryService.getDeliveriesByEmail(name);
        if (!deliveries.isEmpty()) {
            return new ResponseEntity<>(deliveries, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/markAsDelivered")
    public ResponseEntity<String> markDeliveryAsDelivered(@PathVariable Long id) {
        try {
            deliveryService.markAsDelivered(id);
            return ResponseEntity.ok("Delivery marked as delivered.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Delivery not found with id: " + id);
        }
    }

}
