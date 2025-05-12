package com.tiklakur.logcommon;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@RequiredArgsConstructor
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
    private final HttpServletRequest request;
    private final ObjectMapper objectMapper;



    @Pointcut("execution(* com.tiklakur..service..*(..))")
    public void applicationServiceMethods() {
    }

    @Pointcut("@annotation(com.tiklakur.logcommon.annotation.Logger)")
    public void applicationLoggerAnnotation() {
    }

    @Before("applicationLoggerAnnotation()")
    public void logBefore(JoinPoint joinPoint) {
        logDetails(joinPoint);
    }

    private void logDetails (JoinPoint joinPoint){
        String method = request.getMethod();
        String endpoint = request.getRequestURI();
        Object[] args = joinPoint.getArgs();
        String clientIp = request.getRemoteAddr();
        logger.info("✅ Client IP: {} | HTTP Method: {} | Endpoint: {} | Payload : {}", clientIp, method, endpoint,Arrays.toString(args));

    }

    private String extractPayload(Object[] args) {
        try {
            return objectMapper.writeValueAsString(args);
        } catch (Exception e) {
            return Arrays.toString(args);
        }
    }

}
