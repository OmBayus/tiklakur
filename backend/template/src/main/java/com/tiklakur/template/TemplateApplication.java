package com.tiklakur.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(value = {"com.tiklakur"})
public class TemplateApplication {

        public static void main(String[] args) {
            SpringApplication.run(TemplateApplication.class, args);
        }

    }
