package com.ombayus.user.user.controller;


import com.ombayus.authentication.common.dto.UserValidateDTO;
import com.ombayus.logcommon.Loggable;
import com.ombayus.logcommon.SensitiveLog;
import com.ombayus.user.user.dto.LoginRequest;
import com.ombayus.user.user.dto.LoginResponse;
import com.ombayus.user.user.dto.RegisterRequest;
import com.ombayus.user.user.service.UserService;
import org.springframework.http.HttpStatus;
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

    @Loggable
    @SensitiveLog
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(this.userService.login(loginRequest));
    }
    @SensitiveLog
    @Loggable
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest registerRequest) {
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
        userValidateDTO.setUsername(authentication.getName());
        userValidateDTO.setRole(authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", ""));
        return ResponseEntity.ok(
                userValidateDTO
        );
    }
}