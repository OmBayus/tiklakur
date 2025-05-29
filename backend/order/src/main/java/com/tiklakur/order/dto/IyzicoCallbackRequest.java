package com.tiklakur.order.dto;

import lombok.Data;

@Data
public class IyzicoCallbackRequest {
    private String conversationId;
    private String paymentId;
    private String token;
}
