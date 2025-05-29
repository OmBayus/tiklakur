package com.tiklakur.special_request.service;

import com.tiklakur.special_request.dto.CreateUpdateSpecialRequestDTO;
import com.tiklakur.special_request.dto.PageRequestDTO;
import com.tiklakur.special_request.dto.PageResponseDTO;
import com.tiklakur.special_request.dto.SpecialRequestResponseDTO;
import org.springframework.http.ResponseEntity;

public interface ISpecialRequestService {

    public ResponseEntity<Object> create(CreateUpdateSpecialRequestDTO specialRequestDTO);
    public PageResponseDTO<SpecialRequestResponseDTO> getAll(PageRequestDTO pageRequest);
    public ResponseEntity<Object> getById(String id);
    public ResponseEntity<Object> updateById(String id, CreateUpdateSpecialRequestDTO sectionDTO);
    public ResponseEntity<Object>  deleteById(String id);
}
