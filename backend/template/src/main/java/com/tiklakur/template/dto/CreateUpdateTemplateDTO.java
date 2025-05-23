package com.tiklakur.template.dto;


import com.tiklakur.template.entity.Section;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUpdateTemplateDTO {

    @NotEmpty(message = "Name boş olamaz")
    private String name;

    @NotEmpty(message = "Category boş olamaz")
    private String category;

    @NotEmpty(message = "Sections boş olamaz")
    private List<ObjectId> sections;
}
