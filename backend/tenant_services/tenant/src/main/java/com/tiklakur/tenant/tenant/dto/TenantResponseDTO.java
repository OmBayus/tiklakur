package com.tiklakur.tenant.tenant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantResponseDTO {
    private String id;
    private String templateId;
    private String subdomain;
    private LocalDateTime expireDate;
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 