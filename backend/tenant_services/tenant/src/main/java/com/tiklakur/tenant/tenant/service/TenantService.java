package com.tiklakur.tenant.tenant.service;

import com.tiklakur.tenant.tenant.dto.TenantRequestDTO;
import com.tiklakur.tenant.tenant.dto.TenantResponseDTO;
import com.tiklakur.tenant.tenant.entity.Tenant;
import com.tiklakur.tenant.tenant.mapper.TenantMapper;
import com.tiklakur.tenant.tenant.repository.TenantRepository;
import com.tiklakur.tenant.tenant_content.dto.TenantContentRequestDTO;
import com.tiklakur.tenant.tenant_content.service.TenantContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TenantService {
    private final TenantRepository tenantRepository;
    private final TenantMapper tenantMapper;
    private final TenantContentService tenantContentService;

    @Transactional
    public TenantResponseDTO createTenant(TenantRequestDTO requestDTO) {
        if (tenantRepository.existsBySubdomain(requestDTO.getSubdomain())) {
            throw new RuntimeException("Tenant with this subdomain already exists");
        }
        Tenant tenant = tenantMapper.toEntity(requestDTO);
        tenant = tenantRepository.save(tenant);

        // Create initial TenantContent
        TenantContentRequestDTO contentRequestDTO = TenantContentRequestDTO.builder()
                .tenantId(tenant.getId())
                .content(new HashMap<>())
                .build();
        tenantContentService.createTenantContent(contentRequestDTO);

        return tenantMapper.toResponseDTO(tenant);
    }

    @Transactional(readOnly = true)
    public List<TenantResponseDTO> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(tenantMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TenantResponseDTO getTenantById(String id) {
        return tenantRepository.findById(id)
                .map(tenantMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
    }

    @Transactional
    public TenantResponseDTO updateTenant(String id, TenantRequestDTO requestDTO) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        
        tenantMapper.updateEntityFromDTO(requestDTO, tenant);
        return tenantMapper.toResponseDTO(tenantRepository.save(tenant));
    }

    @Transactional
    public void deleteTenant(String id) {
        if (!tenantRepository.existsById(id)) {
            throw new RuntimeException("Tenant not found");
        }
        tenantRepository.deleteById(id);
    }
} 