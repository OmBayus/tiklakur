package com.tiklakur.template.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemplateDto {


    @NotBlank(message = "İsim boş olamaz")
    private String name;

    @NotBlank(message = "Kategori boş olamaz")
    private String category;

    @NotNull(message = "Sections listesi boş olamaz")
    private List<SectionDto> sections;
}
