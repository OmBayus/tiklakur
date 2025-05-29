package com.tiklakur.order.service;

import com.tiklakur.order.model.Order;
import com.tiklakur.order.model.OrderStatus;
import com.tiklakur.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Order createOrder(Order order) {
        order.setStatus(OrderStatus.CREATED);
        return orderRepository.save(order);
    }

    public void markAsPaid(String conversationId) {
        Order order = orderRepository.findByConversationId(conversationId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);
    }

    public void updateIyzicoInfo(String orderId, String token, String paymentId, String conversationId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setIyzicoToken(token);
        order.setIyzicoPaymentId(paymentId);
        order.setConversationId(conversationId);
        orderRepository.save(order);
    }
}