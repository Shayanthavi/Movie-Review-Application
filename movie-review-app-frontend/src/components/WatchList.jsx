import React, { useEffect, useState } from "react";
import axios from "axios";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpeg";
import pic4 from "../assets/images/pic4.jpeg";

const WatchList = () => {
  const [reviews, setReviews] = useState([]);

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
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(response.data);
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
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <img
                src={imageMap[review.imageName]}
                alt={review.imageName}
                style={styles.image}
              />
              <div style={styles.reviewContent}>
                <p style={styles.reviewText}>{review.reviewText}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noReviews}>No reviews found. Add some reviews first!</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#3B365D",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    textAlign: "center",
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
    backgroundColor: "#5A4F7D",
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
    margin: 0,
  },
  noReviews: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
};

export default WatchList;