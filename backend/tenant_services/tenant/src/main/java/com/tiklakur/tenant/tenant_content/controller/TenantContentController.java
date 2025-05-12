package com.tiklakur.tenant.tenant_content.controller;

import com.tiklakur.tenant.tenant_content.dto.TenantContentRequestDTO;
import com.tiklakur.tenant.tenant_content.dto.TenantContentResponseDTO;
import com.tiklakur.tenant.tenant_content.service.TenantContentService;
import com.tiklakur.tenant.tenant.service.TenantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tenant_content")
@CrossOrigin("*")
@RequiredArgsConstructor
public class TenantContentController {

    private final TenantContentService tenantContentService;
    private final TenantService tenantService;

    @PostMapping
    public ResponseEntity<TenantContentResponseDTO> createTenantContent(@RequestBody TenantContentRequestDTO requestDTO) {
        return ResponseEntity.ok(tenantContentService.createTenantContent(requestDTO));
    }

    @GetMapping
    public ResponseEntity<List<TenantContentResponseDTO>> getAllTenantContents() {
        return ResponseEntity.ok(tenantContentService.getAllTenantContents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TenantContentResponseDTO> getTenantContentById(@PathVariable String id) {
        return tenantContentService.getTenantContentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<TenantContentResponseDTO> getTenantContentsByTenantId(@PathVariable String tenantId) {
        if (isTenantExpired(tenantId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(tenantContentService.getTenantContentsByTenantId(tenantId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TenantContentResponseDTO> updateTenantContent(
            @PathVariable String id,
            @RequestBody TenantContentRequestDTO requestDTO) {
        try {
            return ResponseEntity.ok(tenantContentService.updateTenantContent(id, requestDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenantContent(@PathVariable String id) {
        tenantContentService.deleteTenantContent(id);
        return ResponseEntity.ok().build();
    }

    private boolean isTenantExpired(String tenantId) {
        var tenant = tenantService.getTenantById(tenantId);
        return !tenant.isActive() || (tenant.getExpireDate() != null && tenant.getExpireDate().isBefore(LocalDateTime.now()));
    }
}
