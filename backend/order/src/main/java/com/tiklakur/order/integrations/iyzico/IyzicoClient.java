package com.tiklakur.order.integrations.iyzico;

import com.iyzipay.Options;
import com.iyzipay.Request;
import com.iyzipay.model.*;
import com.iyzipay.request.CreateCheckoutFormInitializeRequest;
import com.iyzipay.request.CreatePaymentRequest;
import com.iyzipay.request.CreateThreedsPaymentRequest;
import com.iyzipay.request.RetrievePaymentRequest;
import com.tiklakur.order.dto.CreateCheckoutOrderRequest;
import com.tiklakur.order.dto.CreateThreeDSecureOrderRequest;
import com.tiklakur.order.model.OrderType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class IyzicoClient {

    @Value("${iyzico.apiKey}")
    private String apiKey;

    @Value("${iyzico.secretKey}")
    private String secretKey;

    @Value("${iyzico.baseUrl}")
    private String baseUrl;

    @Value("${iyzico.callbackUrl}")
    private String callbackUrl;

    @Value("${iyzico.successUrl}")
    private String successUrl;

    @Value("${iyzico.failureUrl}")
    private String failureUrl;

    private Options getOptions() {
        Options options = new Options();
        options.setApiKey(apiKey);
        options.setSecretKey(secretKey);
        options.setBaseUrl(baseUrl);
        return options;
    }

    public CheckoutFormInitialize createCheckoutForm(CreateCheckoutOrderRequest request) {
        CreateCheckoutFormInitializeRequest checkoutFormInitializeRequest = new CreateCheckoutFormInitializeRequest();
        checkoutFormInitializeRequest.setLocale(Locale.TR.getValue());
        checkoutFormInitializeRequest.setConversationId(request.getUserId());
        checkoutFormInitializeRequest.setPrice(request.getTotalPrice());
        checkoutFormInitializeRequest.setPaidPrice(request.getTotalPrice());
        checkoutFormInitializeRequest.setCurrency(Currency.TRY.name());
        checkoutFormInitializeRequest.setBasketId(request.getTemplateId());
        checkoutFormInitializeRequest.setPaymentGroup(PaymentGroup.PRODUCT.name());
        checkoutFormInitializeRequest.setCallbackUrl(callbackUrl);
        checkoutFormInitializeRequest.setEnabledInstallments(new ArrayList<>());

        Buyer buyer = new Buyer();
        buyer.setId(request.getUserId());
        buyer.setName("John");
        buyer.setSurname("Doe");
        buyer.setEmail("email@email.com");
        buyer.setIdentityNumber("74300864791");
        buyer.setRegistrationAddress("Address");
        buyer.setCity("Istanbul");
        buyer.setCountry("Turkey");
        buyer.setIp("85.34.78.112");
        checkoutFormInitializeRequest.setBuyer(buyer);

        Address billingAddress = new Address();
        billingAddress.setContactName("John Doe");
        billingAddress.setCity("Istanbul");
        billingAddress.setCountry("Turkey");
        billingAddress.setAddress("Address");
        checkoutFormInitializeRequest.setBillingAddress(billingAddress);

        List<BasketItem> basketItems = new ArrayList<>();
        BasketItem basketItem = new BasketItem();
        basketItem.setId(request.getTemplateId());
        basketItem.setName("Template");
        basketItem.setCategory1("Template");
        basketItem.setItemType(BasketItemType.VIRTUAL.name());
        basketItem.setPrice(request.getTotalPrice());
        basketItems.add(basketItem);
        checkoutFormInitializeRequest.setBasketItems(basketItems);

        return CheckoutFormInitialize.create(checkoutFormInitializeRequest, getOptions());
    }

    public ThreedsInitialize createThreeDSecurePayment(CreateThreeDSecureOrderRequest request,String conversationId) {
        CreatePaymentRequest createPaymentRequest = new CreatePaymentRequest();
        createPaymentRequest.setLocale(Locale.TR.getValue());
        createPaymentRequest.setConversationId(conversationId);
        createPaymentRequest.setPrice(request.getTotalPrice());
        createPaymentRequest.setPaidPrice(request.getTotalPrice());
        createPaymentRequest.setCurrency(Currency.TRY.name());
        createPaymentRequest.setCallbackUrl(callbackUrl + conversationId);

        PaymentCard paymentCard = new PaymentCard();
        paymentCard.setCardHolderName(request.getCardHolderName());
        paymentCard.setCardNumber(request.getCardNumber());
        paymentCard.setExpireYear(request.getExpireYear());
        paymentCard.setExpireMonth(request.getExpireMonth());
        paymentCard.setCvc(request.getCvc());
        createPaymentRequest.setPaymentCard(paymentCard);

        Buyer buyer = new Buyer();
        buyer.setId(request.getUserId());
        buyer.setName(request.getBuyerName());
        buyer.setSurname(request.getBuyerSurname());
        buyer.setIdentityNumber(request.getBuyerIdentityNumber());
        buyer.setEmail(request.getBuyerEmail());
        buyer.setRegistrationAddress(request.getBuyerRegistrationAddress());
        buyer.setCity(request.getBuyerCity());
        buyer.setCountry(request.getBuyerCountry());
        buyer.setZipCode(request.getBuyerZipCode());
        buyer.setIp(request.getBuyerIp());
        createPaymentRequest.setBuyer(buyer);

        Address billingAddress = new Address();
        billingAddress.setAddress(request.getBillingAddress());
        billingAddress.setZipCode(request.getBillingZipCode());
        billingAddress.setContactName(request.getBillingContactName());
        billingAddress.setCity(request.getBillingCity());
        billingAddress.setCountry(request.getBillingCountry());
        createPaymentRequest.setBillingAddress(billingAddress);

        List<BasketItem> basketItems = new ArrayList<>();
        BasketItem basketItem = new BasketItem();
        basketItem.setId(request.getOrderType() == OrderType.TEMPLATE ? request.getTemplateId(): request.getSpecialId());
        basketItem.setPrice(request.getTotalPrice());
        basketItem.setName(request.getOrderType() == OrderType.TEMPLATE ? request.getTemplateId(): request.getSpecialId());
        basketItem.setCategory1(request.getOrderType() == OrderType.TEMPLATE ? "Template": "Special Request");
        basketItem.setItemType(BasketItemType.VIRTUAL.name());
        basketItems.add(basketItem);
        createPaymentRequest.setBasketItems(basketItems);

        ThreedsInitialize threedsInitialize = ThreedsInitialize.create(createPaymentRequest, getOptions());

        return threedsInitialize;
    }


    public Boolean checkThreeDSecurePayment(String conversationId, String paymentId) {
        RetrievePaymentRequest createThreedsPaymentRequest = new RetrievePaymentRequest();
        createThreedsPaymentRequest.setConversationId(conversationId);
        createThreedsPaymentRequest.setPaymentId(paymentId);
        createThreedsPaymentRequest.setLocale(Locale.TR.getValue());
        createThreedsPaymentRequest.setPaymentConversationId(conversationId);

        Payment payment = Payment.retrieve(createThreedsPaymentRequest,getOptions());
        return Objects.equals(payment.getPaymentStatus(), "CALLBACK_THREEDS") &&  Objects.equals(payment.getStatus(), "success")  && payment.getMdStatus() == 1;
    }
}
