package com.example.market_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
public class MarketMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(MarketMsApplication.class, args);
    }


    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("marketMsFindAll", r -> r.path("/products")
                        .and()
                        .method("GET")
                        .uri("http://localhost:8082/"))

                .route("marketMsFindById", r -> r.path("/products/{id}")
                        .and()
                        .method("GET")
                        .uri("http://localhost:8082/"))

                .route("marketMsCreate", r -> r.path("/products")
                        .and()
                        .method("POST")
                        .uri("http://localhost:8082/"))

                .route("marketMsDelete", r -> r.path("/products/{id}")
                        .and()
                        .method("DELETE")
                        .uri("http://localhost:8082/"))

                .route("marketMsUpdate", r -> r.path("/products/{id}")
                        .and()
                        .method("PUT")
                        .uri("http://localhost:8082/"))

                .route("marketMsPatch", r -> r.path("/products/{id}")
                        .and()
                        .method("PATCH")
                        .and()
                        .header("Content-Type", "application/merge-patch+json")
                        .uri("http://localhost:8082/"))
                .build();
    }
}


