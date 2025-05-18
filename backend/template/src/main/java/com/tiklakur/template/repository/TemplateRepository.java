package com.tiklakur.template.repository;

import com.tiklakur.template.entity.Template;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateRepository extends MongoRepository<Template, ObjectId> {
}
