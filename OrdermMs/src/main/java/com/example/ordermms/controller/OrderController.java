package com.example.ordermms.controller;

import com.example.ordermms.Entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.ordermms.service.IOrderService;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    IOrderService orderService;


    @PostMapping(value = "/createOrder")
    public Order createOrder(@RequestBody Order order) {

       return  orderService.createOrder(order);

    }


    @GetMapping("/getall")
    public List<Order> GetOrder() {

        return orderService.getAllOrders();
    }

@GetMapping("/get/{id}")
    public Order getOrder(@PathVariable("id") Long id) {

        return orderService.getOrder(id);
    }


    @PutMapping ("/put/{id}")
    public void updateOrder(@PathVariable("id") Long id, @RequestBody Order O) {
        O.setId(id);
        orderService.updateOrder(O);

    }

    @DeleteMapping("/del/{id}")
    public void deleteOrder(@PathVariable("id") Long id) {

        orderService.deleteOrder(id);

    }
}