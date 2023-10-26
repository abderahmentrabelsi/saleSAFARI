package com.example.ordermms.service;

import com.example.ordermms.Entity.Order;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IOrderService {


    Order createOrder(Order order);
    List<Order> getAllOrders();
    Order updateOrder(Order order);
    void deleteOrder(Long id);
    Order getOrder(Long id);


    List<Order> getOrderByUserId(String id);
}
