package com.tiklakur.order.controller;

import com.iyzipay.model.ThreedsInitialize;
import com.tiklakur.order.dto.CreateCheckoutOrderRequest;
import com.tiklakur.order.dto.CreateThreeDSecureOrderRequest;
import com.tiklakur.order.model.Order;
import com.tiklakur.order.service.OrderService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/3d-secure")
    public ResponseEntity<ThreedsInitialize> createThreeDSecureOrder(@RequestBody CreateThreeDSecureOrderRequest request) {
        ThreedsInitialize createdOrder = orderService.createThreeDSecureOrder(request);
        return ResponseEntity.ok(createdOrder);
    }

    @PostMapping("/checkout")
    public ResponseEntity<Order> createCheckoutOrder(@RequestBody CreateCheckoutOrderRequest request) {
        Order createdOrder = orderService.createCheckoutOrder(request);
        return ResponseEntity.ok(createdOrder);
    }

    @PostMapping("/callback/{id}")
    public ResponseEntity<?> createCheckoutOrder(@PathVariable String id, HttpServletResponse response) throws IOException {
        String url = this.orderService.checkPayment(id);
        response.sendRedirect(url);
        return ResponseEntity.ok(url);
    }
} 