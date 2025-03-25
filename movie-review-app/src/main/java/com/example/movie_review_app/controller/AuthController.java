package com.example.movie_review_app.controller;

import com.example.movie_review_app.model.User;
import com.example.movie_review_app.security.JwtUtil;
import com.example.movie_review_app.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encode the password
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        if (userDetails != null && passwordEncoder.matches(user.getPassword(), userDetails.getPassword())) {
            String token = jwtUtil.generateToken(userDetails); // Generate JWT token
            return ResponseEntity.ok(token); // Return the token
        }
        return ResponseEntity.badRequest().body("Invalid username or password");
    }
}