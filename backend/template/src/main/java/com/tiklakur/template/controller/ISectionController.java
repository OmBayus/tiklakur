package com.tiklakur.template.controller;

import com.tiklakur.template.dto.CreateUpdateSectionDTO;
import com.tiklakur.template.dto.PageRequestDTO;
import com.tiklakur.template.dto.PageResponseDTO;
import com.tiklakur.template.dto.SectionResponseDTO;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;

public interface ISectionController {

    public ResponseEntity<Object> create(CreateUpdateSectionDTO sectionDto);
    public PageResponseDTO<SectionResponseDTO> getAll(Integer page, Integer size);
    public ResponseEntity<Object> getById(String id);
    public ResponseEntity<Object> updateById(String id, CreateUpdateSectionDTO sectionDTO);
    public ResponseEntity<Object> deleteById(String id);

}
