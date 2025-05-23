package com.tiklakur.template.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUpdateSectionDTO {

    @NotEmpty(message = "Key boş olamaz")
    private String key;

    @NotEmpty(message = "Type boş olamaz")
    private String type;

    @NotEmpty(message = "Label boş olamaz")
    private String label;

    @NotNull(message = "Mandatory alanı null olamaz")
    private Boolean mandatory;
}
