package com.tiklakur.special_request.entity;
import com.tiklakur.mongocommon.MongoCommonEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;


@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@Document(collection = "special_requests")
public class SpecialRequest extends MongoCommonEntity {


    private String fullName;
    private String email;
    private String phoneNumber;
    private String templateId;
    private String message;
    private String requestId;
    private RequestStatus status;
}
