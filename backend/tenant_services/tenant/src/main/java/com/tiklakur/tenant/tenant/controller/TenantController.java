package com.tiklakur.tenant.tenant.controller;

import com.tiklakur.tenant.tenant.dto.TenantRequestDTO;
import com.tiklakur.tenant.tenant.dto.TenantResponseDTO;
import com.tiklakur.tenant.tenant.service.TenantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenant")
@RequiredArgsConstructor
public class TenantController {
    private final TenantService tenantService;

    @PostMapping
    public ResponseEntity<TenantResponseDTO> createTenant(@RequestBody TenantRequestDTO requestDTO) {
        return new ResponseEntity<>(tenantService.createTenant(requestDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TenantResponseDTO>> getAllTenants() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TenantResponseDTO> getTenantById(@PathVariable String id) {
        return ResponseEntity.ok(tenantService.getTenantById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TenantResponseDTO> updateTenant(
            @PathVariable String id,
            @RequestBody TenantRequestDTO requestDTO) {
        return ResponseEntity.ok(tenantService.updateTenant(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable String id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.noContent().build();
    }
} 