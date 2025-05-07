package com.tiklakur.common;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HelloController {


    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Merhaba, Spring Boot!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/hello/{name}")
    public ResponseEntity<String> sayHelloToUser(@PathVariable String name) {
        return ResponseEntity.ok(String.format("Merhaba, %s!", name));
    }
}