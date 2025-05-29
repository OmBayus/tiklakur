package com.tiklakur.order.controller;

import com.tiklakur.order.dto.IyzicoCallbackRequest;
import com.tiklakur.order.dto.OrderRequest;
import com.tiklakur.order.model.Order;
import com.tiklakur.order.model.PaymentType;
import com.tiklakur.order.service.IyzicoService;
import com.tiklakur.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    private final OrderService orderService;
    private final IyzicoService iyzicoService;

    @PostMapping("/threeds")
    public ResponseEntity<?> init3DSPayment(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request.toOrder(PaymentType.THREE_D_SECURE));
        String iframeHtml = iyzicoService.initialize3DSPayment(order);
        return ResponseEntity.ok(iframeHtml);
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> initCheckoutPayment(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request.toOrder(PaymentType.CHECKOUT_FORM));
        String redirectUrl = iyzicoService.initializeCheckoutPayment(order);
        return ResponseEntity.ok(redirectUrl);
    }

    @PostMapping("/callback")
    public ResponseEntity<Void> handleCallback(@RequestBody IyzicoCallbackRequest callback) {
        boolean isPaid = iyzicoService.verifyPayment(callback);
        if (isPaid) {
            orderService.markAsPaid(callback.getConversationId());
        }
        return ResponseEntity.ok().build();
    }
}
