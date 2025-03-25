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
      imageName: images[currentImageIndex].name, // Ensure imageName is passed
      reviewText: review,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
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
      <div style={styles.content}>
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
          <button onClick={() => setShowPopup(true)} style={styles.button}>
            Add Reviews
          </button>
          <button onClick={goToWatchList} style={styles.button}>
            Go to Watch List
          </button>
        </div>
        {showPopup && (
          <ReviewPopup
            imageName={images[currentImageIndex].name} // Pass imageName to ReviewPopup
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#3B365D",
    padding: "20px",
  },
  content: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    maxWidth: "800px",
    width: "100%",
  },
  imageContainer: {
    marginBottom: "20px",
  },
  image: {
    width: "500px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#3B365D",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#5A4F7D",
    },
  },
};

export default Home;