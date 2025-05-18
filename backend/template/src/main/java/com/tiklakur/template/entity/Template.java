package com.tiklakur.template.entity;

import com.tiklakur.mongocommon.MongoCommonEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "templates")
public class Template extends MongoCommonEntity {

    private String name;
    private String category;

    @DocumentReference
    private List<Section> sections;
}
