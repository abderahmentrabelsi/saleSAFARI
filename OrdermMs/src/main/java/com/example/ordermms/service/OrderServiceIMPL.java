package com.example.ordermms.service;

import com.example.ordermms.Entity.Order;
import com.example.ordermms.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class OrderServiceIMPL implements IOrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);

    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrder(Long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
            orderRepository.deleteById(id);
    }

    @Override
       public List<Order> getOrderByUserId(String id) {
        return orderRepository.findByCustomerid(id);
    }




}
