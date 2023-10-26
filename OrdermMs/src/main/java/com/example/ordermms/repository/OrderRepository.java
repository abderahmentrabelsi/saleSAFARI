package com.example.ordermms.repository;


import com.example.ordermms.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {


    List<Order> findByCustomerid(String id);

    void deleteById(Long id);


}
