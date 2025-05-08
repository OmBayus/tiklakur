package com.ombayus.user.user.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
}