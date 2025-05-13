package com.tiklakur.tenant.tenant.mapper;

import com.tiklakur.tenant.tenant.dto.TenantRequestDTO;
import com.tiklakur.tenant.tenant.dto.TenantResponseDTO;
import com.tiklakur.tenant.tenant.entity.Tenant;
import org.springframework.stereotype.Component;

@Component
public class TenantMapper {
    
    public Tenant toEntity(TenantRequestDTO dto) {
        return Tenant.builder()
                .templateId(dto.getTemplateId())
                .subdomain(dto.getSubdomain())
                .expireDate(dto.getExpireDate())
                .isActive(dto.isActive())
                .build();
    }

    public TenantResponseDTO toResponseDTO(Tenant entity) {
        return TenantResponseDTO.builder()
                .id(entity.getId())
                .templateId(entity.getTemplateId())
                .subdomain(entity.getSubdomain())
                .expireDate(entity.getExpireDate())
                .isActive(entity.isActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public void updateEntityFromDTO(TenantRequestDTO dto, Tenant entity) {
        entity.setTemplateId(dto.getTemplateId());
        entity.setSubdomain(dto.getSubdomain());
        entity.setExpireDate(dto.getExpireDate());
        entity.setActive(dto.isActive());
    }
} 