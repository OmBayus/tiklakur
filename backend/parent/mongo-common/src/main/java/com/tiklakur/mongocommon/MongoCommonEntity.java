package com.tiklakur.mongocommon;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
public abstract class MongoCommonEntity {
    @Id
    private String id;

    @CreatedDate
    @Field("created_at")
    private LocalDateTime createdAt;
}
