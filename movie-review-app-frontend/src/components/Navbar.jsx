import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import logo from "../assets/images/logo.png"; // Add your logo in the assets folder

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#5A4F7D", // Lighter purple for contrast
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="MV Rev Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
            fontWeight: "bold", // Make the text bold
          }}
        >
          Home
        </Link>
        <Link
          to="/watchlist"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold", // Make the text bold
          }}
        >
          Watch List
        </Link>
      </div>
      <div>
        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
            fontWeight: "bold", // Make the text bold
          }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold", // Make the text bold
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;