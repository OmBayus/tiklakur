package com.tiklakur.template.repository;

import com.tiklakur.template.entity.Section;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends MongoRepository<Section, ObjectId> {
}
