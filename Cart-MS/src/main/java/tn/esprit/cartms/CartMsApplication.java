package tn.esprit.cartms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
@EnableEurekaClient
public class CartMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(CartMsApplication.class, args);
    }



}
