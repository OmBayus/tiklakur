package com.tiklakur.template.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SectionResponseDTO {


    private String key;

    private String type;

    private String label;

    private Boolean mandatory;
}
