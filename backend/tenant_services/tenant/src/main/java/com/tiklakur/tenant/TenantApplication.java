package com.tiklakur.tenant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@ComponentScan(value = {"com.tiklakur"})
@EnableMongoAuditing
public class TenantApplication {

    public static void main(String[] args) {
        SpringApplication.run(TenantApplication.class, args);
    }

}
