package com.example.delivery_ms.service;

import com.example.delivery_ms.entity.Courier;
import com.example.delivery_ms.repository.CourierRepository;
import com.example.delivery_ms.serviceInterface.ICourierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourierServiceImpl implements ICourierService {

    private final CourierRepository courierRepository;

    @Autowired
    public CourierServiceImpl(CourierRepository courierRepository) {
        this.courierRepository = courierRepository;
    }

    @Override
    public List<Courier> getAllCouriers() {
        return courierRepository.findAll();
    }

    @Override
    public Courier getCourierById(Long id) {
        Optional<Courier> optionalCourier = courierRepository.findById(id);
        return optionalCourier.orElse(null);
    }

    @Override
    public Courier createCourier(Courier courier) {
        return courierRepository.save(courier);
    }

    @Override
    public Courier updateCourier(Long id, Courier courier) {
        Optional<Courier> existingCourier = courierRepository.findById(id);
        if (existingCourier.isPresent()) {
            // Update the fields of the existing courier with the new values
            Courier updatedCourier = existingCourier.get();
            updatedCourier.setFirstName(courier.getFirstName());
            updatedCourier.setLastName(courier.getLastName());
            updatedCourier.setPhoneNumber(courier.getPhoneNumber());
            updatedCourier.setIsAvailable(courier.isAvailable());

            return courierRepository.save(updatedCourier);
        } else {
            return null; // Courier not found
        }
    }

    @Override
    public boolean deleteCourier(Long id) {
        if (courierRepository.existsById(id)) {
            courierRepository.deleteById(id);
            return true;
        } else {
            return false; // Courier not found
        }
    }
}
