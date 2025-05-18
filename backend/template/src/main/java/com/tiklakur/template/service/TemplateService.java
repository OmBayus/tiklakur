package com.tiklakur.template.service;

import com.tiklakur.template.repository.TemplateRepository;
import org.springframework.stereotype.Service;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateService(TemplateRepository templateRepository){this.templateRepository=templateRepository; };
}
