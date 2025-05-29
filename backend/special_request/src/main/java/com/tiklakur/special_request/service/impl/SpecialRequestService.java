package com.tiklakur.special_request.service.impl;

import com.tiklakur.emailcommon.service.EmailService;
import com.tiklakur.special_request.dto.*;
import com.tiklakur.special_request.entity.RequestStatus;
import com.tiklakur.special_request.entity.SpecialRequest;
import com.tiklakur.special_request.repository.SpecialRequestRepository;
import com.tiklakur.special_request.service.ISpecialRequestService;
import org.bson.types.ObjectId;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
public class SpecialRequestService implements ISpecialRequestService {

    @Autowired
    private SpecialRequestRepository specialRequestRepository;

    @Autowired
    private EmailService emailService;

    @Value("${template.welcome}")
    private String templateWelcome;

    @Override
    public ResponseEntity<Object> create(CreateUpdateSpecialRequestDTO specialRequestDTO) {
        try {
            SpecialRequest specialRequest = new SpecialRequest();
            BeanUtils.copyProperties(specialRequestDTO,specialRequest);
            specialRequest.setRequestId(UUID.randomUUID().toString());
            specialRequest.setStatus(RequestStatus.PENDING);

            SpecialRequest saved = specialRequestRepository.save(specialRequest);

            SpecialRequestResponseDTO response = new SpecialRequestResponseDTO();
            BeanUtils.copyProperties(saved,response);
            emailService.sendHtmlEmail(response.getEmail(),"Talep Oluşturuldu",templateWelcome,response);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public PageResponseDTO<SpecialRequestResponseDTO> getAll(PageRequestDTO pageRequest) {
        try {
            Pageable pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
            Page<SpecialRequest> specialRequestPage = specialRequestRepository.findAll(pageable);

            List<SpecialRequestResponseDTO> content = specialRequestPage.getContent().stream()
                    .map(this::returnSpecialRequest)
                    .collect(Collectors.toList());

            return  new PageResponseDTO<>(
                    content,
                    specialRequestPage.getNumber(),
                    specialRequestPage.getSize(),
                    specialRequestPage.getTotalElements(),
                    specialRequestPage.getTotalPages(),
                    specialRequestPage.hasNext(),
                    specialRequestPage.hasPrevious()
            );

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<Object> getById(String id) {
        try {
            ObjectId objectId = new ObjectId(id);

            Optional<SpecialRequest> optional = specialRequestRepository.findById(objectId);

            if(optional.isPresent()){
                SpecialRequestResponseDTO response = new SpecialRequestResponseDTO();
                BeanUtils.copyProperties(optional.get(),response);
                return ResponseEntity.ok().body(response);
            }
            return ResponseEntity.status(404).body(errorResponse("Special Request Not Found"));


        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<Object> updateById(String id, CreateUpdateSpecialRequestDTO specialRequestDTO) {
        try {
            ObjectId objectId = new ObjectId(id);

            Optional<SpecialRequest> optional = specialRequestRepository.findById(objectId);
            if (optional.isPresent()) {
                SpecialRequest existingSpecialRequest= optional.get();
                BeanUtils.copyProperties(specialRequestDTO,existingSpecialRequest);

                SpecialRequest updated = specialRequestRepository.save(existingSpecialRequest);
                return ResponseEntity.ok().body(returnSpecialRequest(updated));

            }
            return ResponseEntity.status(404).body(errorResponse("Special Request Not Found"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<Object> deleteById(String id) {
        try {
            ObjectId objectId = new ObjectId(id);

            Optional<SpecialRequest> optional = specialRequestRepository.findById(objectId);

            if (optional.isPresent()) {
                SpecialRequestResponseDTO responseDTO = new SpecialRequestResponseDTO();
                BeanUtils.copyProperties(optional.get(),responseDTO);
                specialRequestRepository.deleteById(objectId);
                return ResponseEntity.ok().body(responseDTO);
            }
            return ResponseEntity.status(404).body(errorResponse("Special Request Not Found"));

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private SpecialRequestResponseDTO returnSpecialRequest(SpecialRequest specialRequest){
        return new SpecialRequestResponseDTO(
                specialRequest.getFullName(),
                specialRequest.getEmail(),
                specialRequest.getPhoneNumber(),
                specialRequest.getRequestId(),
                specialRequest.getTemplateId(),
                specialRequest.getMessage(),
                specialRequest.getStatus()
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
