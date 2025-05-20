package com.tiklakur.tenant.tenant_content.repository;

import com.tiklakur.tenant.tenant_content.entity.TenantContent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantContentRepository extends MongoRepository<TenantContent, String> {
    Optional<TenantContent> findByTenantId(String tenantId);
}