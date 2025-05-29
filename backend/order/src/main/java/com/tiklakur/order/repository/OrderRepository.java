package com.tiklakur.order.repository;

import com.tiklakur.order.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);
    Optional<Order> findByConversationId(String conversationId);
}
