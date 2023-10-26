package com.example.delivery_ms.serviceInterface;

import com.example.delivery_ms.entity.Delivery;
import java.util.List;

public interface IDeliveryService {

    List<Delivery> getAllDeliveries();

    Delivery getDeliveryById(Long id);

    Delivery createDelivery(Delivery delivery);

    Delivery updateDelivery(Long id, Delivery delivery);

    boolean deleteDelivery(Long id);

    List<Delivery> getDeliveriesByEmail(String nom);

    void markAsDelivered(Long id);

}
