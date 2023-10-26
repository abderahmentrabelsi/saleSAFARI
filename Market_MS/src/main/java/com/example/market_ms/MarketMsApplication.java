package com.example.market_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MarketMsApplication {
    public static void main(String[] args) {
        SpringApplication.run(MarketMsApplication.class, args);
    }
}


