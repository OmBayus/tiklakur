package com.tiklakur.template.controller.impl;


import com.tiklakur.template.controller.ISectionController;
import com.tiklakur.template.dto.CreateUpdateSectionDTO;
import com.tiklakur.template.dto.SectionResponseDTO;
import com.tiklakur.template.dto.PageRequestDTO;
import com.tiklakur.template.dto.PageResponseDTO;
import com.tiklakur.template.service.ISectionService;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/sections")
public class SectionController implements ISectionController {

    @Autowired
    private ISectionService sectionService;


    @PostMapping
    @Override
    public ResponseEntity<Object> create(@RequestBody @Valid CreateUpdateSectionDTO sectionDto){

        return sectionService.create(sectionDto);
    }

    @GetMapping
    @Override
    public PageResponseDTO<SectionResponseDTO> getAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        PageRequestDTO pageRequest = new PageRequestDTO(page, size);
        return sectionService.getAll(pageRequest);
    }


    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable(name = "id") String id) {
        return  sectionService.getById(id);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@PathVariable(name = "id") String id, @RequestBody @Valid CreateUpdateSectionDTO  sectionDTO) {
        return sectionService.updateById(id,sectionDTO);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable(name = "id") String id) {
        return sectionService.deleteById(id);
    }





}
