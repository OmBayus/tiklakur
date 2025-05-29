package com.tiklakur.special_request;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(value = {"com.tiklakur"})
public class SpecialRequestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpecialRequestApplication.class, args);
    }

}
