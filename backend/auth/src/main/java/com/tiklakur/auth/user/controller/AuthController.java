package com.tiklakur.auth.user.controller;

import com.tiklakur.authentication.common.dto.UserValidateDTO;
import com.tiklakur.auth.user.dto.LoginRequest;
import com.tiklakur.auth.user.dto.LoginResponse;
import com.tiklakur.auth.user.dto.RegisterRequest;
import com.tiklakur.auth.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(this.userService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(this.userService.register(registerRequest));
    }

    @GetMapping("/validate")
    public UserValidateDTO validate(@RequestParam String token) {
        return this.userService.validateToken(token);
    }

    @GetMapping("/me")
    public ResponseEntity<UserValidateDTO> getCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Authentication required");
        }
        UserValidateDTO userValidateDTO = new UserValidateDTO();
        userValidateDTO.setEmail(authentication.getName());
        userValidateDTO.setRole(authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", ""));
        return ResponseEntity.ok(userValidateDTO);
    }
}