package com.example.delivery_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.example.delivery_ms.entity")
public class DeliveryMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeliveryMsApplication.class, args);
    }

}
