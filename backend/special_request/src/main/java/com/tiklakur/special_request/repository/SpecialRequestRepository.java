package com.tiklakur.special_request.repository;

import com.tiklakur.special_request.entity.SpecialRequest;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialRequestRepository extends MongoRepository<SpecialRequest, ObjectId> {
    Page<SpecialRequest> findAll(Pageable pageable);

}
