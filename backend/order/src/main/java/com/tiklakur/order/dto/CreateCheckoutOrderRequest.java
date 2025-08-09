package com.tiklakur.order.dto;

import com.tiklakur.order.model.OrderType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateCheckoutOrderRequest {
    private String userId;
    private BigDecimal totalPrice;
    private OrderType orderType;
    private String templateId;
    private String specialId;
} 