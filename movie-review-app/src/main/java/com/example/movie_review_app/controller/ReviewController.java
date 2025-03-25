package com.example.movie_review_app.controller;

import com.example.movie_review_app.model.Review;
import com.example.movie_review_app.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> saveReview(@RequestBody Review review) {
        Review savedReview = reviewService.saveReview(review);
        return ResponseEntity.ok(savedReview);
    }
}