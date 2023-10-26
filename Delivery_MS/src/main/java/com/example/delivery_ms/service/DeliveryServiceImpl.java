package com.example.delivery_ms.service;

import com.example.delivery_ms.entity.Courier;
import com.example.delivery_ms.entity.Delivery;
import com.example.delivery_ms.repository.CourierRepository;
import com.example.delivery_ms.repository.DeliveryRepository;
import com.example.delivery_ms.serviceInterface.IDeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryServiceImpl implements IDeliveryService {

    private final DeliveryRepository deliveryRepository;
    private CourierRepository courierRepository;

    @Autowired
    public DeliveryServiceImpl(DeliveryRepository deliveryRepository , CourierRepository courierRepository) {
        this.deliveryRepository = deliveryRepository;
        this.courierRepository = courierRepository;
    }

    @Override
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    @Override
    public Delivery getDeliveryById(Long id) {
        Optional<Delivery> optionalDelivery = deliveryRepository.findById(id);
        return optionalDelivery.orElse(null);
    }

    @Override
    public Delivery createDelivery(Delivery delivery) {

        Long deliveryManCIN = delivery.getDeliveryMan().getCin();
        Optional<Courier> optionalCourier = courierRepository.findById(deliveryManCIN);

        if (optionalCourier.isPresent()) {
            Courier courier = optionalCourier.get();
            delivery.setDeliveryMan(courier);
            Delivery createdDelivery = deliveryRepository.save(delivery);
            courier.getDeliveries().add(createdDelivery);
            courierRepository.save(courier);

            return createdDelivery;
        } else {
            return null;
        }
    }



    @Override
    public Delivery updateDelivery(Long id, Delivery delivery) {
        Optional<Delivery> existingDelivery = deliveryRepository.findById(id);
        if (existingDelivery.isPresent()) {
            // Update the fields of the existing delivery with the new values
            Delivery updatedDelivery = existingDelivery.get();
            updatedDelivery.setRecipientname(delivery.getRecipientname());
            updatedDelivery.setDeliveryAddress(delivery.getDeliveryAddress());
            updatedDelivery.setDeliveryCost(delivery.getDeliveryCost());
            updatedDelivery.setIsDelivered(delivery.isDelivered());
            updatedDelivery.setDeliveryMan(delivery.getDeliveryMan());
            updatedDelivery.setOrder_id(delivery.getOrder_id());

            return deliveryRepository.save(updatedDelivery);
        } else {
            return null; // Delivery not found
        }
    }

    @Override
    public boolean deleteDelivery(Long id) {
        if (deliveryRepository.existsById(id)) {
            deliveryRepository.deleteById(id);
            return true;
        } else {
            return false; // Delivery not found
        }
    }

    @Override
    public List<Delivery> getDeliveriesByEmail(String nom) {
        return deliveryRepository.findByRecipientname(nom);
    }

    @Override
    public void markAsDelivered(Long id) {
        Optional<Delivery> deliveryOptional = deliveryRepository.findById(id);
        if (deliveryOptional.isPresent()) {
            Delivery delivery = deliveryOptional.get();
            delivery.setIsDelivered(true);
            deliveryRepository.save(delivery);
        } else {
            throw new EntityNotFoundException("Delivery not found with id: " + id);
        }
    }
}
