import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username,
          password,
          email,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>REGISTER</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputContainer}>
            <FaUser style={styles.icon} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <FaUser style={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            REGISTER
          </button>
        </form>
        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
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
    backgroundColor: "#3B365D",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "35px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    color: "#3B365D",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "90px",
    padding: "10px",
  },
  icon: {
    color: "#3B365D",
    marginRight: "10px",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#3B365D",
    color: "#fff",
    border: "none",
    borderRadius: "90px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  footerText: {
    color: "#3B365D",
    marginTop: "15px",
  },
  link: {
    color: "#3B365D",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;