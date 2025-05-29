package com.tiklakur.order.dto;

import com.tiklakur.order.model.Order;
import com.tiklakur.order.model.OrderType;
import com.tiklakur.order.model.PaymentType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderRequest {
    private String userId;
    private BigDecimal totalPrice;
    private OrderType orderType;
    private String templateId;
    private String specialId;

    public Order toOrder(PaymentType paymentType) {
        Order order = new Order();
        order.setUserId(this.userId);
        order.setTotalPrice(this.totalPrice);
        order.setOrderType(this.orderType);
        order.setPaymentType(paymentType);
        order.setTemplateId(this.templateId);
        order.setSpecialId(this.specialId);
        return order;
    }
}
