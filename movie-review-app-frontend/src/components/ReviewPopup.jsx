import React, { useState } from "react";

const ReviewPopup = ({ onSubmit, onClose }) => {
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      onSubmit(review);
      setReview("");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3 style={styles.popupTitle}>Write Your Review</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={styles.textarea}
            placeholder="Type your review here..."
            required
          />
          <div style={styles.popupButtons}>
            <button type="submit" style={styles.popupButton}>
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              style={styles.popupButtonCancel}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    width: "400px",
    maxWidth: "90%",
  },
  popupTitle: {
    color: "#3B365D",
    marginBottom: "15px",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "4px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    marginBottom: "15px",
    resize: "none", // Disable resizing
  },
  popupButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  popupButton: {
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
  popupButtonCancel: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "#000",
    border: "none",
    borderRadius: "25px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#999",
    },
  },
};

export default ReviewPopup;