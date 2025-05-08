package com.tiklakur.auth.user.entity;

import com.tiklakur.mongocommon.MongoCommonEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User extends MongoCommonEntity {

    private String username;

    private String password;

    private String role; // ADMIN,SUPPORT,USER
}