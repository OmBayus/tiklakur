package com.tiklakur.template.controller;

import com.tiklakur.template.dto.*;
import org.springframework.http.ResponseEntity;

public interface ITemplateController {

    public ResponseEntity<Object> create(CreateUpdateTemplateDTO templateDto);
    public PageResponseDTO<TemplateResponseDTO> getAll(Integer page, Integer size);
    public ResponseEntity<Object> getById(String id);
    public ResponseEntity<Object> updateById(String id, CreateUpdateTemplateDTO templateDto);
    public ResponseEntity<Object> deleteById(String id);
}
