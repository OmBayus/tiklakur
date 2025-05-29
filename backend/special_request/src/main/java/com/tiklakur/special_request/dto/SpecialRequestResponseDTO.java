package com.tiklakur.special_request.dto;

import com.tiklakur.special_request.entity.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialRequestResponseDTO {


    private String fullName;
    private String email;
    private String phoneNumber;
    private String requestId;
    private String templateId;
    private String message;
    private RequestStatus status;
}
