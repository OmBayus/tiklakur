package com.tiklakur.tenant.tenant_content.repository;

import com.tiklakur.tenant.tenant_content.entity.TenantContent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TenantContentRepository extends MongoRepository<TenantContent, String> {
    List<TenantContent> findByTenantId(String tenantId);
}