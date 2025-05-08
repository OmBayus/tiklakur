package com.tiklakur.authentication.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserValidateDTO {
    private String username;
    private String role;
}
