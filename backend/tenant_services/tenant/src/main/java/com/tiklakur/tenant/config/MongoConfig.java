package com.tiklakur.tenant.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.domain.Sort;
import jakarta.annotation.PostConstruct;

@Configuration
public class MongoConfig {

    private final MongoTemplate mongoTemplate;

    public MongoConfig(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @PostConstruct
    public void initIndexes() {
        // Create unique index on tenantId field in tenant_contents collection
        mongoTemplate.indexOps("tenant_contents")
                .ensureIndex(
                        new Index().on("tenantId", Sort.Direction.ASC).unique()
                );

        // Create index on subdomain field in tenant collection
        mongoTemplate.indexOps("tenant")
                .ensureIndex(
                        new Index().on("subdomain", Sort.Direction.ASC).unique()
                );
    }
} 