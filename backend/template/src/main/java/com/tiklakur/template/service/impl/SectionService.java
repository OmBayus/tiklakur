package com.tiklakur.template.service.impl;

import com.tiklakur.template.dto.*;
import com.tiklakur.template.entity.Section;
import com.tiklakur.template.repository.SectionRepository;
import com.tiklakur.template.service.ISectionService;
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
public class SectionService implements ISectionService {

    private final SectionRepository sectionRepository;

    public SectionService(SectionRepository sectionRepository){this.sectionRepository=sectionRepository;};

    @Override
    public ResponseEntity<Object> create(CreateUpdateSectionDTO sectionDto){
        try {
                Section section= Section.builder()
                        .key(sectionDto.getKey())
                        .type(sectionDto.getType())
                        .label(sectionDto.getLabel())
                        .mandatory(sectionDto.getMandatory())
                        .build();

                Section createdSection=   sectionRepository.save(section);

                return ResponseEntity.ok().body(returnSection(createdSection));
        }

        catch (Exception e) {
                throw new RuntimeException(e);
        }
    }

    @Override
    public PageResponseDTO<SectionResponseDTO> getAll(PageRequestDTO pageRequest){
        try {
            Pageable pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
            Page<Section> sectionPage = sectionRepository.findAll(pageable);

            List<SectionResponseDTO> content = sectionPage.getContent().stream()
                    .map(this::returnSection)
                    .collect(Collectors.toList());

            return new PageResponseDTO<>(
                    content,
                    sectionPage.getNumber(), // current page
                    sectionPage.getSize(),   // page size
                    sectionPage.getTotalElements(),
                    sectionPage.getTotalPages(),
                    sectionPage.hasNext(),
                    sectionPage.hasPrevious()
            );

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public  ResponseEntity<Object> getById(String id) {
        try {
            ObjectId objectId = new ObjectId(id);

            Optional<Section> optional = sectionRepository.findById(objectId);

            if (optional.isPresent()) {
                return ResponseEntity.ok().body(returnSection(optional.get()));
            }

            return ResponseEntity.status(404).body(errorResponse("Section Not Found"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<Object> updateById(String id, CreateUpdateSectionDTO sectionDTO) {
        try {
            ObjectId objectId = new ObjectId(id);
            Optional<Section> optional = sectionRepository.findById(objectId);

            if (optional.isPresent()) {

                Section existingSection = optional.get();
                BeanUtils.copyProperties(sectionDTO,existingSection);

                Section updated= sectionRepository.save(existingSection);

                return ResponseEntity.ok().body(returnSection(updated));

            }
            return ResponseEntity.status(404).body(errorResponse("Section Not Found"));


            } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<Object>  deleteById(String id) {
        try {
            ObjectId objectId = new ObjectId(id);

            Optional<Section> optional = sectionRepository.findById(objectId);

            if (optional.isPresent()) {
                SectionResponseDTO responseDTO = new SectionResponseDTO();
                BeanUtils.copyProperties(optional.get(), responseDTO);
                sectionRepository.deleteById(objectId);
                return ResponseEntity.ok().body(responseDTO);

            }
            return ResponseEntity.status(404).body(errorResponse("Section Not Found"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    private SectionResponseDTO returnSection(Section section){
        return new SectionResponseDTO(
                section.getKey(),
                section.getType(),
                section.getLabel(),
                section.isMandatory()
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
