package com.tiklakur.tenant.tenant_content.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantContentRequestDTO {
    private String tenantId;
    private Map<String, Object> content;
} 