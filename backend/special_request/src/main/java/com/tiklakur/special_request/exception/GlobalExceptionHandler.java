package com.tiklakur.special_request.exception;

import com.tiklakur.special_request.dto.ErrorResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleMethodArgumentNotValidExceptions(MethodArgumentNotValidException e){
        Map<String , List<String>> errors= new HashMap<>();

        for(ObjectError error: e.getBindingResult().getAllErrors()){
            String fieldName = ((FieldError)error).getField();
            if(errors.containsKey(fieldName)){
                errors.put(fieldName,addMapValue(errors.get(fieldName),error.getDefaultMessage()));
            }else {
                errors.put(fieldName,addMapValue(new ArrayList<>(),error.getDefaultMessage()));

            }

        }

        return ResponseEntity.badRequest().body(createErrorDto(errors));
    }

    private List<String> addMapValue(List<String> list,String newValue){
        list.add(newValue);
        return list;

    }

    private <T> ErrorResponseDTO<T> createErrorDto(T errors){
        ErrorResponseDTO<T> response = new ErrorResponseDTO<T>();

        response.setErrors(errors);
        response.setId(UUID.randomUUID().toString());
        response.setDate(new Date());

        return response;
    }
}
