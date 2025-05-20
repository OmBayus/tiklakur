package com.tiklakur.authentication.common.config;

import com.tiklakur.authentication.common.dto.UserValidateDTO;
import com.tiklakur.authentication.common.service.AuthServiceClient;
import com.tiklakur.authentication.common.utils.SecurityUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthServiceClient authServiceClient;
    private final List<String> whitelist = Arrays.asList(
            "/api/auth/validate",
            "/api/auth/login",
            "/api/auth/register",
            "/ws/**"
    );

    JwtAuthenticationFilter(JwtConfig jwtConfig, AuthServiceClient authServiceClient) {
        this.authServiceClient = authServiceClient;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return whitelist.stream().anyMatch(path::startsWith);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            UserValidateDTO user = authServiceClient.getUserFromToken(token);
            if (user != null) {
                SecurityUtil.setUserInContext(user);
            }
        }
        chain.doFilter(request, response);
    }
}