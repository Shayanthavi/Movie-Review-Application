import React, { useEffect, useState } from "react";
import axios from "axios";
import pic1 from "../assets/images/pic1.jpeg"; // Import your images
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpeg";
import pic4 from "../assets/images/pic4.jpeg";

const WatchList = () => {
  const [reviews, setReviews] = useState([]);

  // Map image names to their corresponding image files
  const imageMap = {
    pic1: pic1,
    pic2: pic2,
    pic3: pic3,
    pic4: pic4,
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/reviews", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });
        if (response.status === 200) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Watch List</h1>
      <div style={styles.reviewsContainer}>
        {reviews.map((review, index) => (
          <div key={index} style={styles.reviewCard}>
            <img
              src={imageMap[review.imageName]} // Use the imageMap to get the correct image
              alt={review.imageName}
              style={styles.image}
            />
            <div style={styles.reviewContent}>
              <p style={styles.reviewText}>{review.reviewText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "#3B365D",
    marginBottom: "20px",
  },
  reviewsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  reviewCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "10px",
    objectFit: "cover",
    marginRight: "20px",
  },
  reviewContent: {
    flex: 1,
  },
  reviewText: {
    fontSize: "1rem",
    color: "#333",
    margin: 0,
  },
};

export default WatchList;