package com.tiklakur.tenant.tenant_content.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantContentResponseDTO {
    private String id;
    private String tenantId;
    private Map<String, Object> content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 