package com.tiklakur.template.entity;

import com.tiklakur.mongocommon.MongoCommonEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "templates")
@Getter
@Setter
public class Template extends MongoCommonEntity {

    private String name;
    private String category;

    @DocumentReference(lazy = false)
    private List<Section> sections;
}
