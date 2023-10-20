package io.salesafari.msdelivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsdeliveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsdeliveryApplication.class, args);
    }

}
