package com.tiklakur.authentication.common.utils;

import com.tiklakur.authentication.common.dto.UserValidateDTO;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;

public class SecurityUtil {

    public static UsernamePasswordAuthenticationToken getAuthentication(UserValidateDTO user) {
        return new UsernamePasswordAuthenticationToken(user.getUsername(), null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole())) );
    }

    public static void setUserInContext(UserValidateDTO user) {
        UsernamePasswordAuthenticationToken auth = getAuthentication(user);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}