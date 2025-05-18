package com.tiklakur.template.service;

import com.tiklakur.template.dto.SectionDto;
import com.tiklakur.template.entity.Section;
import com.tiklakur.template.repository.SectionRepository;
import org.springframework.stereotype.Service;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;

    public SectionService(SectionRepository sectionRepository){this.sectionRepository=sectionRepository;};


    public SectionDto create(SectionDto sectionDto){
        try {
                Section section= Section.builder()
                        .key(sectionDto.getKey())
                        .type(sectionDto.getType())
                        .label(sectionDto.getLabel())
                        .mandatory(sectionDto.getMandatory())
                        .build();

                Section createdSection=   sectionRepository.save(section);

                return returnSection(createdSection);
        }

        catch (Exception e) {
                throw new RuntimeException(e.getMessage());
        }
    }

    private SectionDto returnSection(Section section){
        return new SectionDto(
                section.getKey(),
                section.getType(),
                section.getLabel(),
                section.isMandatory()
                );


    }
}
