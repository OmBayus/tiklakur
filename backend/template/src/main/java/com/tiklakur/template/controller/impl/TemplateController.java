package com.tiklakur.template.controller.impl;

import com.tiklakur.template.controller.ITemplateController;
import com.tiklakur.template.dto.*;
import com.tiklakur.template.service.ITemplateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/templates")
public class TemplateController implements ITemplateController {

    @Autowired
    private ITemplateService templateService;

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@RequestBody @Valid CreateUpdateTemplateDTO templateDto) {
        return templateService.create(templateDto);
    }

    @GetMapping
    @Override
    public PageResponseDTO<TemplateResponseDTO> getAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        PageRequestDTO pageRequest = new PageRequestDTO(page, size);

        return templateService.getAll(pageRequest);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable(name = "id") String id) {
        return templateService.getById(id);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@PathVariable(name = "id") String id,@RequestBody @Valid CreateUpdateTemplateDTO templateDto) {
        return templateService.updateById(id,templateDto);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable(name = "id") String id) {
        return templateService.deleteById(id);
    }
}
