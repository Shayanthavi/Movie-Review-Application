import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import WatchList from './components/WatchList'; // Import the WatchList component
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> {/* Protected Home route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchList />
            </ProtectedRoute>
          }
        /> {/* Protected Watch List route */}
      </Routes>
    </Router>
  );
};

export default App;