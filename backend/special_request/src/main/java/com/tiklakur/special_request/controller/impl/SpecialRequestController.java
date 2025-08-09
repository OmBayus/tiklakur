package com.tiklakur.special_request.controller.impl;

import com.tiklakur.special_request.controller.ISpecialRequestController;
import com.tiklakur.special_request.dto.CreateUpdateSpecialRequestDTO;
import com.tiklakur.special_request.dto.PageRequestDTO;
import com.tiklakur.special_request.dto.PageResponseDTO;
import com.tiklakur.special_request.dto.SpecialRequestResponseDTO;
import com.tiklakur.special_request.service.ISpecialRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/special-requests")
public class SpecialRequestController implements ISpecialRequestController {

    @Autowired
    private ISpecialRequestService specialRequestService;


    @PostMapping
    @Override
    public ResponseEntity<Object> create(@RequestBody @Valid CreateUpdateSpecialRequestDTO specialRequestDTO) {
        return specialRequestService.create(specialRequestDTO);
    }

    @GetMapping
    @Override
    public PageResponseDTO<SpecialRequestResponseDTO> getAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        PageRequestDTO pageRequest = new PageRequestDTO(page, size);
        return specialRequestService.getAll(pageRequest);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable(name = "id") String id) {
        return specialRequestService.getById(id);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@PathVariable(name = "id") String id, @RequestBody @Valid CreateUpdateSpecialRequestDTO specialRequestDTO) {
        return specialRequestService.updateById(id,specialRequestDTO);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable(name = "id") String id) {
        return specialRequestService.deleteById(id);
    }
}
