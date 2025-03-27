import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import styled, { keyframes } from "styled-components";

// Animation for navbar entry
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Animation for hover effects
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const NavContainer = styled.nav`
  background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${slideDown} 0.5s ease-out;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.img`
  height: 40px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotate(-5deg) scale(1.1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 8px 15px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    animation: ${pulse} 0.5s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

const AuthLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const Navbar = () => {
  return (
    <NavContainer>
      <LogoContainer>
        <Logo src={logo} alt="MV Rev Logo" />
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/watchlist">Reviews</NavLink>
        </NavLinks>
      </LogoContainer>
      
      <AuthLinks>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </AuthLinks>
    </NavContainer>
  );
};

export default Navbar;