package com.tiklakur.order.service;

import com.tiklakur.order.dto.IyzicoCallbackRequest;
import com.tiklakur.order.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;

@Service
@RequiredArgsConstructor
public class IyzicoService {

    private final RestTemplate restTemplate;
    private final OrderService orderService;

    private final String API_URL = "https://sandbox-api.iyzipay.com";
    private final String API_KEY = "sandbox-GKu4Imh7ur2SZlzBIycvAVhHG8hJHpyJ";
    private final String SECRET_KEY = "sandbox-Blpw2DujC8zKHgm1BlXIx8lJXaVOGGWY";

    public String initialize3DSPayment(Order order) {
        String url = API_URL + "/payment/3dsecure/initialize";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("locale", "tr");
        requestBody.put("conversationId", order.getId());
        requestBody.put("price", order.getTotalPrice().toString());
        requestBody.put("paidPrice", order.getTotalPrice().add(BigDecimal.valueOf(0.2)).toString());
        requestBody.put("installment", 1);
        requestBody.put("paymentChannel", "WEB");
        requestBody.put("basketId", "BASKET_" + order.getId());
        requestBody.put("paymentGroup", "PRODUCT");
        requestBody.put("callbackUrl", "http://localhost:4005/api/payment/callback");
        requestBody.put("currency", "TRY");

        Map<String, String> paymentCard = new HashMap<>();
        paymentCard.put("cardHolderName", "John Doe");
        paymentCard.put("cardNumber", "5528790000000008");
        paymentCard.put("expireYear", "2030");
        paymentCard.put("expireMonth", "12");
        paymentCard.put("cvc", "123");
        requestBody.put("paymentCard", paymentCard);

        Map<String, Object> buyer = new HashMap<>();
        buyer.put("id", order.getUserId());
        buyer.put("name", "John");
        buyer.put("surname", "Doe");
        buyer.put("identityNumber", "74300864791");
        buyer.put("email", "email@email.com");
        buyer.put("gsmNumber", "+905350000000");
        buyer.put("registrationDate", "2013-04-21 15:12:09");
        buyer.put("lastLoginDate", "2015-10-05 12:43:35");
        buyer.put("registrationAddress", "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1");
        buyer.put("city", "Istanbul");
        buyer.put("country", "Turkey");
        buyer.put("zipCode", "34732");
        buyer.put("ip", "85.34.78.112");
        requestBody.put("buyer", buyer);

        Map<String, String> shippingAddress = new HashMap<>();
        shippingAddress.put("address", "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1");
        shippingAddress.put("zipCode", "34742");
        shippingAddress.put("contactName", "Jane Doe");
        shippingAddress.put("city", "Istanbul");
        shippingAddress.put("country", "Turkey");
        requestBody.put("shippingAddress", shippingAddress);

        Map<String, String> billingAddress = new HashMap<>();
        billingAddress.put("address", "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1");
        billingAddress.put("zipCode", "34742");
        billingAddress.put("contactName", "Jane Doe");
        billingAddress.put("city", "Istanbul");
        billingAddress.put("country", "Turkey");
        requestBody.put("billingAddress", billingAddress);

        List<Map<String, String>> basketItems = new ArrayList<>();
        Map<String, String> item1 = new HashMap<>();
        item1.put("id", "BI101");
        item1.put("price", "0.3");
        item1.put("name", "Binocular");
        item1.put("category1", "Collectibles");
        item1.put("category2", "Accessories");
        item1.put("itemType", "PHYSICAL");
        basketItems.add(item1);

        Map<String, String> item2 = new HashMap<>();
        item2.put("id", "BI102");
        item2.put("price", "0.5");
        item2.put("name", "Game code");
        item2.put("category1", "Game");
        item2.put("category2", "Online Game Items");
        item2.put("itemType", "VIRTUAL");
        basketItems.add(item2);

        Map<String, String> item3 = new HashMap<>();
        item3.put("id", "BI103");
        item3.put("price", "0.2");
        item3.put("name", "Usb");
        item3.put("category1", "Electronics");
        item3.put("category2", "Usb / Cable");
        item3.put("itemType", "PHYSICAL");
        basketItems.add(item3);

        requestBody.put("basketItems", basketItems);

        HttpHeaders headers = buildHeaders(requestBody);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        Map<String, Object> body = response.getBody();

        return body != null ? (String) body.get("threeDSHtmlContent") : null;
    }



    public String initializeCheckoutPayment(Order order) {
        String url = API_URL + "/payment/iyzipos/checkoutform/initialize/auth/ecom";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("locale", "tr");
        requestBody.put("conversationId", order.getId());
        requestBody.put("price", order.getTotalPrice().toString());
        requestBody.put("paidPrice", order.getTotalPrice().add(BigDecimal.valueOf(0.2)).toString());
        requestBody.put("basketId", "BASKET_" + order.getId());
        requestBody.put("paymentGroup", "PRODUCT");
        requestBody.put("callbackUrl", "http://localhost:4005/api/payment/callback");
        requestBody.put("currency", "TRY");
        requestBody.put("enabledInstallments", Arrays.asList(1, 2, 3));

        requestBody.put("buyer", getDummyBuyer(order.getUserId()));
        requestBody.put("shippingAddress", getDummyAddress());
        requestBody.put("billingAddress", getDummyAddress());
        requestBody.put("basketItems", getDummyBasket());

        HttpHeaders headers = buildHeaders(requestBody);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        Map<String, Object> body = response.getBody();

        return body != null ? (String) body.get("paymentPageUrl") : null;
    }


    public boolean verifyPayment(IyzicoCallbackRequest callback) {
        if (callback.getToken() != null) {
            // Checkout form için kontrol
            return verifyCheckoutForm(callback);
        } else {
            // 3D Secure için kontrol
            return verify3DSecure(callback);
        }
    }

    private boolean verify3DSecure(IyzicoCallbackRequest callback) {
        String url = API_URL + "/payment/detail";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("locale", "tr");
        requestBody.put("conversationId", callback.getConversationId());
        requestBody.put("paymentId", callback.getPaymentId());
        requestBody.put("paymentConversationId", callback.getConversationId());

        HttpHeaders headers = buildHeaders(requestBody);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        Map<String, Object> body = response.getBody();

        if (body != null && "success".equalsIgnoreCase((String) body.get("status"))) {
            // Gerekirse token ve ödemeId order'a kaydedilebilir
            orderService.updateIyzicoInfo(callback.getConversationId(), null, callback.getPaymentId(), callback.getConversationId());
            return true;
        }
        return false;
    }


    private boolean verifyCheckoutForm(IyzicoCallbackRequest callback) {
        String url = API_URL + "/payment/iyzipos/checkoutform/auth/ecom/detail";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("locale", "tr");
        requestBody.put("conversationId", callback.getConversationId());
        requestBody.put("token", callback.getToken());

        HttpHeaders headers = buildHeaders(requestBody);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        Map<String, Object> body = response.getBody();

        if (body != null && "success".equalsIgnoreCase((String) body.get("status"))) {
            String paymentId = (String) body.get("paymentId");
            orderService.updateIyzicoInfo(callback.getConversationId(), callback.getToken(), paymentId, callback.getConversationId());
            return true;
        }
        return false;
    }


    private HttpHeaders buildHeaders(Map<String, Object> requestBody) {
        String rnd = String.valueOf(System.currentTimeMillis());
        String pkiString = generatePKIString(requestBody);
        String auth = generateAuthorization(API_KEY, SECRET_KEY, rnd, pkiString);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", auth);
        headers.set("x-iyzi-rnd", rnd);
        return headers;
    }

    private String generatePKIString(Map<String, Object> obj) {
        StringBuilder builder = new StringBuilder();
        builder.append("[");
        
        boolean isFirst = true;
        for (Map.Entry<String, Object> entry : obj.entrySet()) {
            if (!isFirst) {
                builder.append(",");
            }
            isFirst = false;
            
            String key = entry.getKey();
            Object val = entry.getValue();
            builder.append(key).append("=");
            
            if (val instanceof Map) {
                builder.append(generatePKIString((Map<String, Object>) val));
            } else if (val instanceof List) {
                builder.append("[");
                List<?> list = (List<?>) val;
                for (int i = 0; i < list.size(); i++) {
                    if (i > 0) {
                        builder.append(", ");
                    }
                    Object item = list.get(i);
                    if (item instanceof Map) {
                        Map<String, Object> mapItem = (Map<String, Object>) item;
                        boolean isItemFirst = true;
                        for (Map.Entry<String, Object> itemEntry : mapItem.entrySet()) {
                            if (!isItemFirst) {
                                builder.append(",");
                            }
                            isItemFirst = false;
                            builder.append(itemEntry.getKey()).append("=").append(itemEntry.getValue());
                        }
                    } else {
                        builder.append(item);
                    }
                }
                builder.append("]");
            } else if (val == null) {
                builder.append("null");
            } else {
                builder.append(val);
            }
        }
        
        builder.append("]");
        return builder.toString();
    }

    private String generateAuthorization(String apiKey, String secretKey, String rnd, String pkiString) {
        try {
            String dataToSign = apiKey + rnd + secretKey + pkiString;
            System.out.println("Data to sign: " + dataToSign); // Debug için

            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] digest = md.digest(dataToSign.getBytes(StandardCharsets.UTF_8));
            String hash = Base64.getEncoder().encodeToString(digest);

            return "IYZWS " + apiKey + ":" + hash;
        } catch (Exception e) {
            throw new RuntimeException("Authorization generation failed", e);
        }
    }



    private Map<String, Object> getDummyBuyer(String userId) {
        Map<String, Object> buyer = new HashMap<>();
        buyer.put("id", userId);
        buyer.put("name", "John");
        buyer.put("surname", "Doe");
        buyer.put("identityNumber", "74300864791");
        buyer.put("email", "john@example.com");
        buyer.put("gsmNumber", "+905350000000");
        buyer.put("registrationDate", "2013-04-21 15:12:09");
        buyer.put("lastLoginDate", "2024-12-05 12:43:35");
        buyer.put("registrationAddress", "Deneme Mahallesi, Sokak No:1");
        buyer.put("city", "Istanbul");
        buyer.put("country", "Turkey");
        buyer.put("zipCode", "34732");
        buyer.put("ip", "85.34.78.112");
        return buyer;
    }

    private Map<String, Object> getDummyAddress() {
        Map<String, Object> address = new HashMap<>();
        address.put("address", "Deneme Mahallesi, Sokak No:1");
        address.put("zipCode", "34742");
        address.put("contactName", "Jane Doe");
        address.put("city", "Istanbul");
        address.put("country", "Turkey");
        return address;
    }

    private List<Map<String, Object>> getDummyBasket() {
        List<Map<String, Object>> items = new ArrayList<>();
        items.add(Map.of("id", "BI101", "price", "0.3", "name", "Ürün A", "category1", "Kategori1", "category2", "AltKategori", "itemType", "PHYSICAL"));
        items.add(Map.of("id", "BI102", "price", "0.5", "name", "Ürün B", "category1", "Kategori1", "category2", "AltKategori", "itemType", "VIRTUAL"));
        return items;
    }

}
