import React, { useState } from "react";
import ReviewPopup from "./ReviewPopup";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpeg";
import pic4 from "../assets/images/pic4.jpeg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const images = [
    { src: pic1, name: "pic1" },
    { src: pic2, name: "pic2" },
    { src: pic3, name: "pic3" },
    { src: pic4, name: "pic4" },
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleReviewSubmit = async (review) => {
    const reviewData = {
      imageName: images[currentImageIndex].name,
      reviewText: review,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      
      const data = await response.json();
      console.log("Review submitted:", data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }

    setShowPopup(false);
  };

  const goToWatchList = () => {
    navigate("/watchlist");
  };

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Movie Review App</h2>
        <p style={styles.subtitle}>Browse and review your favorite movies</p>
        
        <div style={styles.imageContainer}>
          <img
            src={images[currentImageIndex].src}
            alt="Movie"
            style={styles.image}
          />
        </div>
        
        <div style={styles.buttonContainer}>
          <button onClick={handleNextImage} style={styles.button}>
            Next Image
          </button>
          <button 
            onClick={() => setShowPopup(true)} 
            style={styles.button}
          >
            Add Review
          </button>
          
           
        </div>
        
        {showPopup && (
          <ReviewPopup
            onSubmit={handleReviewSubmit}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    width: "90%",
    maxWidth: "800px",
    textAlign: "center",
    color: "white",
    animation: "fadeIn 0.5s ease-out",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "30px",
  },
  imageContainer: {
    marginBottom: "25px",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "25px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "150px",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      transform: "translateY(-2px)",
    },
  },
};

export default Home;