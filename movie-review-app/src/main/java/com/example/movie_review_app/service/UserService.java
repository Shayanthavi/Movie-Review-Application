package com.example.movie_review_app.service;

import com.example.movie_review_app.model.User;

import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}