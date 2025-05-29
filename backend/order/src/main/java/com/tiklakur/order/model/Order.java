package com.tiklakur.order.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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

    private String iyzicoToken;

    private String iyzicoPaymentId;

    private String conversationId;


    @CreatedDate
    private LocalDateTime createdAt = LocalDateTime.now();
}
