package com.tiklakur.order.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Document(collection = "orders")
@Data
@NoArgsConstructor
public class Order {

    @Id
    private String id;

    private String userId;

    private BigDecimal totalPrice;

    private OrderType orderType;

    private OrderStatus status = OrderStatus.CREATED;

    private PaymentType paymentType;

    private String templateId;

    private String specialId;

    private PaymentDetails paymentDetails;

    @CreatedDate
    private LocalDateTime createdAt = LocalDateTime.now();

    @Data
    @NoArgsConstructor
    public static class PaymentDetails {
        private String paymentId;  // For 3D Secure payments
        private String token;      // For Checkout payments
        private Map<String, Object> additionalDetails; // For any other payment-specific data
    }
}
