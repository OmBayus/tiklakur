package com.tiklakur.order.dto;

import com.tiklakur.order.model.OrderType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateThreeDSecureOrderRequest {
    private String userId;
    private BigDecimal totalPrice;
    private OrderType orderType;
    private String templateId;
    private String specialId;
    
    // Payment Card Information
    private String cardHolderName;
    private String cardNumber;
    private String expireYear;
    private String expireMonth;
    private String cvc;
    
    // Buyer Information
    private String buyerName;
    private String buyerSurname;
    private String buyerEmail;
    private String buyerIdentityNumber;
    private String buyerRegistrationAddress;
    private String buyerCity;
    private String buyerCountry;
    private String buyerZipCode;
    private String buyerIp;
    
    // Billing Address Information
    private String billingAddress;
    private String billingZipCode;
    private String billingContactName;
    private String billingCity;
    private String billingCountry;
} 