package com.tiklakur.auth.user.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageRequestDTO {
    @Min(value = 0, message = "Page number must be greater than or equal to 0")
    private int page = 0;

    @Min(value = 1, message = "Page size must be greater than 0")
    private int size = 10;
} 