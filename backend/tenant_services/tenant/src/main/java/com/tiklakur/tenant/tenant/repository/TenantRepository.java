package com.tiklakur.tenant.tenant.repository;

import com.tiklakur.tenant.tenant.entity.Tenant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TenantRepository extends MongoRepository<Tenant, String> {
    Optional<Tenant> findBySubdomain(String subdomain);
    boolean existsBySubdomain(String subdomain);
} 