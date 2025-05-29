package com.tiklakur.special_request.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUpdateSpecialRequestDTO {

    @NotEmpty(message = "fullName boş olamaz")
    private String fullName;

    @Email(message = "Email formatına uygun olmalıdır")
    @NotEmpty(message = "email boş olamaz")
    private String email;

    @NotEmpty(message = "phoneNumber boş olamaz")
    @Size(min = 10,max = 10)
    private String phoneNumber;

    @NotEmpty(message = "templateId boş olamaz")
    private String templateId;

    private String message;
}
