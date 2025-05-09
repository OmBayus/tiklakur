package com.tiklakur.auth.changelog;

import com.github.cloudyrock.mongock.ChangeLog;
import com.github.cloudyrock.mongock.ChangeSet;
import com.github.cloudyrock.mongock.driver.mongodb.springdata.v3.decorator.impl.MongockTemplate;
import com.tiklakur.auth.user.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@ChangeLog(order = "001")
public class DatabaseChangelog {

    @ChangeSet(order = "001", id = "insertAdminUsers", author = "firdyak")
    public void insertDefaultAdmins (MongockTemplate mongoTemplate){
        if(mongoTemplate.findAll(User.class).isEmpty()){
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            User user1= new User("firdyak",encoder.encode("firdyak123"),"ADMIN");
            User user2= new User("ombayus",encoder.encode("ombayus123"),"ADMIN");
            User user3= new User("cemilacuner",encoder.encode("cemilacuner123"),"ADMIN");
            mongoTemplate.save(user1);
            mongoTemplate.save(user2);
            mongoTemplate.save(user3);

        }
    }
}
