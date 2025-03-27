import React, { useEffect, useState } from "react";
import axios from "axios";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpeg";
import pic4 from "../assets/images/pic4.jpeg";

const WatchList = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <h1 style={styles.title}>Your Reviews</h1>
        <p style={styles.subtitle}>All your movie reviews in one place</p>
        
        {isLoading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p>Loading your reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div style={styles.reviewsContainer}>
            {reviews.map((review, index) => (
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
            ))}
          </div>
        ) : (
          <div style={styles.noReviews}>
            <p>No reviews found. Add some reviews first!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    width: "100%",
    maxWidth: "800px",
    color: "white",
    animation: "fadeIn 0.5s ease-out",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "10px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "30px",
    textAlign: "center",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
  },
  loadingSpinner: {
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "50%",
    borderTop: "4px solid white",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transform: "translateY(-2px)",
    },
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "8px",
    objectFit: "cover",
    marginRight: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  reviewContent: {
    flex: 1,
  },
  reviewText: {
    fontSize: "1rem",
    margin: 0,
    lineHeight: "1.5",
  },
  noReviews: {
    textAlign: "center",
    padding: "40px 0",
    fontSize: "1.1rem",
    opacity: 0.8,
  },
};

export default WatchList;