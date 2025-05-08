package com.tiklakur.auth.user.service;


import com.tiklakur.authentication.common.config.JwtConfig;
import com.tiklakur.authentication.common.dto.UserValidateDTO;
import com.tiklakur.auth.user.dto.LoginRequest;
import com.tiklakur.auth.user.dto.LoginResponse;
import com.tiklakur.auth.user.dto.RegisterRequest;
import com.tiklakur.auth.user.entity.User;
import com.tiklakur.auth.user.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtConfig jwtConfig;

    UserService(PasswordEncoder passwordEncoder, UserRepository userRepository, JwtConfig jwtConfig) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtConfig = jwtConfig;
    }
    public UserValidateDTO validateToken(String token) throws UsernameNotFoundException {
        final String username;
        username = jwtConfig.extractUsername(token);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new UserValidateDTO(
                user.getUsername(),
                user.getRole()
        );
    }

    public LoginResponse login(LoginRequest loginRequest) {

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + loginRequest.getUsername()));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        String token = jwtConfig.generateToken(new UserValidateDTO(user.getUsername(), user.getRole()));

        return new LoginResponse(token);
    }

    public LoginResponse register(RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new UsernameNotFoundException("Username is already in use");
        }

        User user = User.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role("USER")
                .build();

        userRepository.save(user);

        return this.login(new LoginRequest(user.getUsername(), registerRequest.getPassword()));
    }
}