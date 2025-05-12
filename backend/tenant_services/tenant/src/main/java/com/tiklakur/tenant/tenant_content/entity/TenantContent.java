package com.tiklakur.tenant.tenant_content.entity;

import com.tiklakur.mongocommon.MongoCommonEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tenant_contents")
public class TenantContent extends MongoCommonEntity {

    private String tenantId;
    private Map<String, Object> content;
}