package com.tiklakur.template.service;

import com.tiklakur.template.dto.*;
import org.springframework.http.ResponseEntity;

public interface ITemplateService {

    public ResponseEntity<Object> create(CreateUpdateTemplateDTO templateDto);
    public PageResponseDTO<TemplateResponseDTO> getAll(PageRequestDTO pageRequest);
    public ResponseEntity<Object> getById(String id);
    public ResponseEntity<Object> updateById(String id, CreateUpdateTemplateDTO templateDTO);
    public ResponseEntity<Object>  deleteById(String id);
}
