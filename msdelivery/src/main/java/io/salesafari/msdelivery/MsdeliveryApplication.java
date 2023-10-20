package io.salesafari.msdelivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient

public class MsdeliveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsdeliveryApplication.class, args);
    }

}
