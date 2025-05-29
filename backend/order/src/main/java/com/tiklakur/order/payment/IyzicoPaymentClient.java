package com.tiklakur.order.payment;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Map;

@Component
public class IyzicoPaymentClient {

    private static final String API_KEY = "sandbox-GKu4Imh7ur2SZlzBIycvAVhHG8hJHpyJ";
    private static final String SECRET_KEY = "sandbox-Blpw2DujC8zKHgm1BlXlx8IJXaVOGGWY";
    private static final String BASE_URL = "https://sandbox-api.iyzipay.com";

    public static final String CALLBACK_URL = "https://e5aa-178-251-43-122.ngrok-free.app/3dsecure/callback";

    public static final String SUCCESS_URL = "https://seninsite.com/payment/success";
    public static final String FAILURE_URL = "https://seninsite.com/payment/failure";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private HttpHeaders prepareHeaders(String jsonBody, String random) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-iyzi-rnd", random);
        headers.set("Authorization", buildAuthorization(jsonBody, random));
        return headers;
    }

    private String buildAuthorization(String body, String rnd) {
        try {
            String dataToSign = API_KEY + rnd + SECRET_KEY + body;
            Mac sha256_HMAC = Mac.getInstance("HmacSHA1");
            SecretKeySpec secret_key = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA1");
            sha256_HMAC.init(secret_key);
            byte[] hash = sha256_HMAC.doFinal(dataToSign.getBytes());
            String signature = Base64.getEncoder().encodeToString(hash);
            return "IYZWS " + API_KEY + ":" + signature;
        } catch (Exception e) {
            throw new RuntimeException("Authorization generation failed", e);
        }
    }

    public Map<String, Object> initialize3DSPayment(Map<String, Object> requestBody) {
        try {
            String json = objectMapper.writeValueAsString(requestBody);
            String rnd = String.valueOf(System.currentTimeMillis());
            HttpHeaders headers = prepareHeaders(json, rnd);
            HttpEntity<String> request = new HttpEntity<>(json, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    BASE_URL + "/payment/3dsecure/initialize",
                    HttpMethod.POST,
                    request,
                    Map.class
            );
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("3D Secure Init failed", e);
        }
    }

    public Map<String, Object> retrieve3DSPaymentResult(Map<String, Object> requestBody) {
        try {
            String json = objectMapper.writeValueAsString(requestBody);
            String rnd = String.valueOf(System.currentTimeMillis());
            HttpHeaders headers = prepareHeaders(json, rnd);
            HttpEntity<String> request = new HttpEntity<>(json, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    BASE_URL + "/payment/detail",
                    HttpMethod.POST,
                    request,
                    Map.class
            );
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("3D Secure Result failed", e);
        }
    }
}
