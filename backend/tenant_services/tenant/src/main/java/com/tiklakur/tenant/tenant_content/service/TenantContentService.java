package com.tiklakur.tenant.tenant_content.service;

import com.tiklakur.tenant.tenant_content.dto.TenantContentRequestDTO;
import com.tiklakur.tenant.tenant_content.dto.TenantContentResponseDTO;
import com.tiklakur.tenant.tenant_content.entity.TenantContent;
import com.tiklakur.tenant.tenant_content.mapper.TenantContentMapper;
import com.tiklakur.tenant.tenant_content.repository.TenantContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TenantContentService {

    private final TenantContentRepository tenantContentRepository;
    private final TenantContentMapper tenantContentMapper;

    public TenantContentResponseDTO createTenantContent(TenantContentRequestDTO requestDTO) {
        TenantContent entity = tenantContentMapper.toEntity(requestDTO);
        TenantContent savedEntity = tenantContentRepository.save(entity);
        return tenantContentMapper.toResponseDTO(savedEntity);
    }

    public List<TenantContentResponseDTO> getAllTenantContents() {
        return tenantContentRepository.findAll().stream()
                .map(tenantContentMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<TenantContentResponseDTO> getTenantContentById(String id) {
        return tenantContentRepository.findById(id)
                .map(tenantContentMapper::toResponseDTO);
    }

    public TenantContentResponseDTO getTenantContentsByTenantId(String tenantId) {
        Optional<TenantContent> tenantContent = tenantContentRepository.findByTenantId(tenantId);
        return tenantContent.map(tenantContentMapper::toResponseDTO).orElse(null);
    }

    public TenantContentResponseDTO updateTenantContent(String id, TenantContentRequestDTO requestDTO) {
        return tenantContentRepository.findById(id)
                .map(existingContent -> {
                    existingContent.setTenantId(requestDTO.getTenantId());
                    existingContent.setContent(requestDTO.getContent());
                    TenantContent updatedEntity = tenantContentRepository.save(existingContent);
                    return tenantContentMapper.toResponseDTO(updatedEntity);
                })
                .orElseThrow(() -> new RuntimeException("Tenant content not found with id: " + id));
    }

    public void deleteTenantContent(String id) {
        tenantContentRepository.deleteById(id);
    }
}