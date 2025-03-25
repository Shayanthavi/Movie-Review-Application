package com.example.movie_review_app.repository;

import com.example.movie_review_app.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByImageName(String imageName); // Fetch reviews by imageName
    List<Review> findAll(); // Fetch all reviews
}