package com.tiklakur.authentication.common.service;

import com.tiklakur.authentication.common.config.JwtConfig;
import com.tiklakur.authentication.common.dto.UserValidateDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthServiceClient {
    private final RestTemplate restTemplate;
    private final JwtConfig jwtConfig;

    public AuthServiceClient(RestTemplate restTemplate, JwtConfig jwtConfig) {
        this.restTemplate = restTemplate;
        this.jwtConfig = jwtConfig;
    }

    public UserValidateDTO getUserFromToken(String token) {
        return restTemplate.getForObject(jwtConfig.getAuthServiceUrl()+"/auth/validate?token=" + token, UserValidateDTO.class);
    }
}