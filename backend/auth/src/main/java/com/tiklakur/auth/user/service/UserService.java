package com.tiklakur.auth.user.service;

import com.tiklakur.authentication.common.config.JwtConfig;
import com.tiklakur.authentication.common.dto.UserValidateDTO;
import com.tiklakur.auth.user.dto.*;
import com.tiklakur.auth.user.entity.User;
import com.tiklakur.auth.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        final String email;
        email = jwtConfig.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new UserValidateDTO(
                user.getEmail(),
                user.getRole()
        );
    }

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + loginRequest.getEmail()));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        String token = jwtConfig.generateToken(new UserValidateDTO(user.getEmail(), user.getRole()));

        return new LoginResponse(token);
    }

    public LoginResponse register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new UsernameNotFoundException("Email is already in use");
        }

        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role("USER")
                .build();

        userRepository.save(user);

        return this.login(new LoginRequest(user.getEmail(), registerRequest.getPassword()));
    }

    // CRUD Operations
    public PageResponseDTO<UserResponseDTO> getAllUsers(PageRequestDTO pageRequest) {
        Pageable pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
        Page<User> userPage = userRepository.findAll(pageable);
        
        List<UserResponseDTO> userDTOs = userPage.getContent().stream()
                .map(this::convertToUserResponseDTO)
                .collect(Collectors.toList());

        return new PageResponseDTO<>(
                userDTOs,
                userPage.getNumber(),
                userPage.getSize(),
                userPage.getTotalElements(),
                userPage.getTotalPages(),
                userPage.hasNext(),
                userPage.hasPrevious()
        );
    }

    public UserResponseDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        return convertToUserResponseDTO(user);
    }

    public UserResponseDTO updateUser(String id, UpdateUserDTO updateUserDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        
        existingUser.setEmail(updateUserDTO.getEmail());
        if (updateUserDTO.getPassword() != null && !updateUserDTO.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updateUserDTO.getPassword()));
        }
        existingUser.setRole(updateUserDTO.getRole());
        
        User updatedUser = userRepository.save(existingUser);
        return convertToUserResponseDTO(updatedUser);
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new UsernameNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public UserResponseDTO createUser(CreateUserDTO createUserDTO) {
        if (userRepository.findByEmail(createUserDTO.getEmail()).isPresent()) {
            throw new UsernameNotFoundException("Email is already in use");
        }

        if (!isValidRole(createUserDTO.getRole())) {
            throw new IllegalArgumentException("Invalid role. Allowed roles are: ADMIN, SUPPORT, USER");
        }

        User user = User.builder()
                .email(createUserDTO.getEmail())
                .password(passwordEncoder.encode(createUserDTO.getPassword()))
                .role(createUserDTO.getRole())
                .build();

        User savedUser = userRepository.save(user);
        return convertToUserResponseDTO(savedUser);
    }

    private boolean isValidRole(String role) {
        return role.equals("ADMIN") || role.equals("SUPPORT") || role.equals("USER");
    }

    private UserResponseDTO convertToUserResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );
    }
}