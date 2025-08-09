package com.tiklakur.order.service;

import com.iyzipay.model.Payment;
import com.iyzipay.model.ThreedsInitialize;
import com.tiklakur.order.dto.CreateCheckoutOrderRequest;
import com.tiklakur.order.dto.CreateThreeDSecureOrderRequest;
import com.tiklakur.order.integrations.iyzico.IyzicoClient;
import com.tiklakur.order.model.Order;
import com.tiklakur.order.model.OrderStatus;
import com.tiklakur.order.model.OrderType;
import com.tiklakur.order.model.PaymentType;
import com.tiklakur.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final IyzicoClient iyzicoClient;

    public ThreedsInitialize createThreeDSecureOrder(CreateThreeDSecureOrderRequest createThreeDSecureOrderRequest) {
        Order order = new Order();
        order.setUserId(createThreeDSecureOrderRequest.getUserId());
        order.setTotalPrice(createThreeDSecureOrderRequest.getTotalPrice());
        order.setOrderType(createThreeDSecureOrderRequest.getOrderType());
        order.setTemplateId(createThreeDSecureOrderRequest.getTemplateId());
        order.setSpecialId(createThreeDSecureOrderRequest.getSpecialId());
        order.setPaymentType(PaymentType.THREE_D_SECURE);
        Order savedOrder = orderRepository.save(order);

        ThreedsInitialize threedsInitialize = this.iyzicoClient.createThreeDSecurePayment(createThreeDSecureOrderRequest,savedOrder.getId());
        Order.PaymentDetails paymentDetails = new Order.PaymentDetails();
        paymentDetails.setPaymentId(threedsInitialize.getPaymentId());
        if (threedsInitialize != null) {
            if (paymentDetails.getAdditionalDetails() == null) {
                paymentDetails.setAdditionalDetails(new HashMap<>());
            }
            
            paymentDetails.getAdditionalDetails().put("htmlContent", threedsInitialize.getHtmlContent());
            paymentDetails.getAdditionalDetails().put("signature", threedsInitialize.getSignature());
            paymentDetails.getAdditionalDetails().put("status", threedsInitialize.getStatus());
            paymentDetails.getAdditionalDetails().put("errorCode", threedsInitialize.getErrorCode());
            paymentDetails.getAdditionalDetails().put("errorMessage", threedsInitialize.getErrorMessage());
            paymentDetails.getAdditionalDetails().put("systemTime", threedsInitialize.getSystemTime());
        } else {
            throw new RuntimeException("3D Secure initialization failed");
        }
        order.setPaymentDetails(paymentDetails);

        orderRepository.save(savedOrder);
        return threedsInitialize;
    }

    public Order createCheckoutOrder(CreateCheckoutOrderRequest order) {
        // Implementation will be added later
        return null;
    }

    public String checkPayment(String paymentId) {
        Order order = orderRepository.findById(paymentId).orElseThrow(() -> new RuntimeException("Order not found"));
        if(order.getPaymentType() == PaymentType.THREE_D_SECURE) {
            Boolean isPaid = this.iyzicoClient.checkThreeDSecurePayment(order.getId(),order.getPaymentDetails().getPaymentId());
            if(isPaid){
                order.setStatus(OrderStatus.PAID);
                orderRepository.save(order);
                return "http://www.ombayus.com";
            }
        }
        return "ok";
    }
} 