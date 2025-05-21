package com.tiklakur.template.service.impl;

import com.tiklakur.template.dto.*;
import com.tiklakur.template.entity.Section;
import com.tiklakur.template.entity.Template;
import com.tiklakur.template.repository.SectionRepository;
import com.tiklakur.template.repository.TemplateRepository;
import com.tiklakur.template.service.ITemplateService;
import org.bson.types.ObjectId;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TemplateService implements ITemplateService {

    private final TemplateRepository templateRepository;
    private final SectionRepository sectionRepository;

    public TemplateService(TemplateRepository templateRepository,SectionRepository sectionRepository){
        this.templateRepository=templateRepository;
        this.sectionRepository= sectionRepository;
    };

    @Override
    public ResponseEntity<Object> create(CreateUpdateTemplateDTO templateDto) {
        try {
            List<Section> sections = sectionRepository.findAllById(templateDto.getSections());

            Template template = Template.builder()
                    .name(templateDto.getName())
                    .category(templateDto.getCategory())
                    .sections(sections)
                    .build();

            Template createdTemplate = templateRepository.save(template);

            return ResponseEntity.ok().body(returnTemplate(createdTemplate));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public PageResponseDTO<TemplateResponseDTO> getAll(PageRequestDTO pageRequest) {
        try {
            Pageable pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
            Page<Template> templatePage = templateRepository.findAll(pageable);

            List<TemplateResponseDTO> content = templatePage.getContent().stream()
                    .map(this::returnTemplate)
                    .collect(Collectors.toList());



            return new PageResponseDTO<>(
                    content,
                    templatePage.getNumber(), // current page
                    templatePage.getSize(),   // page size
                    templatePage.getTotalElements(),
                    templatePage.getTotalPages(),
                    templatePage.hasNext(),
                    templatePage.hasPrevious()
            );

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<Object> getById(String id) {
        try {
            ObjectId objectId = new ObjectId(id);

            Optional<Template> optional = templateRepository.findById(objectId);

            if (optional.isPresent()) {
                return ResponseEntity.ok().body(returnTemplate(optional.get()));
            }

            return ResponseEntity.status(404).body(errorResponse("Template Not Found"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<Object> updateById(String id, CreateUpdateTemplateDTO templateDTO) {
        try{
            ObjectId objectId = new ObjectId(id);
            Optional<Template> optional = templateRepository.findById(objectId);

            if (optional.isPresent()) {
                Template template = optional.get();
                BeanUtils.copyProperties(templateDTO,template);
                List<Section> sections = sectionRepository.findAllById(templateDTO.getSections());

                template.setSections(sections);

                templateRepository.save(template);
                return  ResponseEntity.ok().body(returnTemplate(template));
            }
            return ResponseEntity.status(404).body(errorResponse("Template Not Found"));

            } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public ResponseEntity<Object> deleteById(String id) {
        try{
            ObjectId objectId = new ObjectId(id);
            Optional<Template> optional = templateRepository.findById(objectId);

            if(optional.isPresent()){
                TemplateResponseDTO responseDTO = new TemplateResponseDTO();
                BeanUtils.copyProperties(optional.get(),responseDTO);
                templateRepository.deleteById(objectId);

                return  ResponseEntity.ok().body(responseDTO);

            }

            return ResponseEntity.status(404).body(errorResponse("Template Not Found"));

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    private TemplateResponseDTO returnTemplate(Template template){
        List<SectionResponseDTO> sectionDtoList = template.getSections()
                .stream()
                .map(section -> {
                    SectionResponseDTO dto = new SectionResponseDTO();
                    BeanUtils.copyProperties(section, dto);
                    return dto;
                })
                .collect(Collectors.toList());

        return new TemplateResponseDTO(
                template.getName(),
                template.getCategory(),
                sectionDtoList
        );
    }

    private <T> ErrorResponseDTO<T> errorResponse(T error){
        ErrorResponseDTO<T> errorResponseDTO= new ErrorResponseDTO<T>();
        errorResponseDTO.setId(UUID.randomUUID().toString());
        errorResponseDTO.setDate(new Date());
        errorResponseDTO.setErrors(error);

        return errorResponseDTO;
    }
}
