package com.tiklakur.special_request.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponseDTO<T> {

    private String id;

    private T errors;

    private Date date;
}