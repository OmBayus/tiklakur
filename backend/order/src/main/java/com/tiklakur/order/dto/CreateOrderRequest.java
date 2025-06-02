package com.tiklakur.order.dto;

import com.tiklakur.order.model.OrderType;
import com.tiklakur.order.model.PaymentType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateOrderRequest {
    private String userId;
    private BigDecimal totalPrice;
    private OrderType orderType;
    private PaymentType paymentType;
    private String templateId;
    private String specialId;
} 