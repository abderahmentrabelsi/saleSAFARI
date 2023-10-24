package com.example.delivery_ms.controller;

import com.example.delivery_ms.entity.Courier;
import com.example.delivery_ms.service.CourierServiceImpl;
import com.example.delivery_ms.serviceInterface.ICourierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/couriers")
public class CourierController {

    @Autowired
    ICourierService courierService;

    // Get a list of all couriers
    @GetMapping
    public ResponseEntity<List<Courier>> getAllCouriers() {
        List<Courier> couriers = courierService.getAllCouriers();
        return new ResponseEntity<>(couriers, HttpStatus.OK);
    }

    // Get a specific courier by ID
    @GetMapping("/{id}")
    public ResponseEntity<Courier> getCourierById(@PathVariable Long id) {
        Courier courier = courierService.getCourierById(id);
        if (courier != null) {
            return new ResponseEntity<>(courier, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create a new courier
    @PostMapping
    public ResponseEntity<Courier> createCourier(@RequestBody Courier courier) {
        Courier createdCourier = courierService.createCourier(courier);
        return new ResponseEntity<>(createdCourier, HttpStatus.CREATED);
    }

    // Update an existing courier
    @PutMapping("/{id}")
    public ResponseEntity<Courier> updateCourier(@PathVariable Long id, @RequestBody Courier courier) {
        Courier updatedCourier = courierService.updateCourier(id, courier);
        if (updatedCourier != null) {
            return new ResponseEntity<>(updatedCourier, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a specific courier by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourier(@PathVariable Long id) {
        if (courierService.deleteCourier(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
