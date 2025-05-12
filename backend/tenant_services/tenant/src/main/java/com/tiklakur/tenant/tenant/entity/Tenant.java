package com.tiklakur.tenant.tenant.entity;

import com.tiklakur.mongocommon.MongoCommonEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tenant")
public class Tenant extends MongoCommonEntity {

    private String templateId;
    private String subdomain;

    private LocalDateTime expireDate;
    private boolean isActive;
}