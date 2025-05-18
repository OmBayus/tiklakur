package com.tiklakur.template.controller;


import com.tiklakur.template.dto.SectionDto;
import com.tiklakur.template.service.SectionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/sections")
public class SectionController {

    private final SectionService sectionService;

    public SectionController (SectionService sectionService){
        this.sectionService=sectionService;
    }

    @PostMapping()
    public SectionDto create(@RequestBody @Valid SectionDto sectionDto){

        return sectionService.create(sectionDto);
    }
}
