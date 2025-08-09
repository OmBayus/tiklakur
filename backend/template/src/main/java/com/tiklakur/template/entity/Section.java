package com.tiklakur.template.entity;


import com.tiklakur.mongocommon.MongoCommonEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "sections")
public class Section extends MongoCommonEntity {

    private String key;
    private String type;
    private String label;
    private boolean mandatory;
}
