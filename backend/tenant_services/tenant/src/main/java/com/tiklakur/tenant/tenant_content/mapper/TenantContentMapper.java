package com.tiklakur.tenant.tenant_content.mapper;

import com.tiklakur.tenant.tenant_content.dto.TenantContentRequestDTO;
import com.tiklakur.tenant.tenant_content.dto.TenantContentResponseDTO;
import com.tiklakur.tenant.tenant_content.entity.TenantContent;
import org.springframework.stereotype.Component;

@Component
public class TenantContentMapper {

    public TenantContent toEntity(TenantContentRequestDTO dto) {
        return TenantContent.builder()
                .tenantId(dto.getTenantId())
                .content(dto.getContent())
                .build();
    }

    public TenantContentResponseDTO toResponseDTO(TenantContent entity) {
        return TenantContentResponseDTO.builder()
                .id(entity.getId())
                .tenantId(entity.getTenantId())
                .content(entity.getContent())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
} 