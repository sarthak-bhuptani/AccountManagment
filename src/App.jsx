import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Simple Landing Page
const Home = () => {
  const { user } = useAuth();
  return (
    <Container className="mt-5 pt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="display-4 fw-bold text-primary mb-4">React Account Manager</h1>
          <p className="lead text-muted mb-5">
            A simple, secure, and clear way to manage your user profile and account details.
            Built with React V16+ and Bootstrap 5.
          </p>
          {!user ? (
            <div className="d-flex gap-3 justify-content-center">
              <Button href="/login" variant="primary" size="lg" className="btn-primary-custom text-white px-5 shadow">Login</Button>
              <Button href="/register" variant="outline-primary" size="lg" className="px-5 rounded-pill shadow-sm bg-white">Register</Button>
            </div>
          ) : (
            <Button href="/profile" variant="primary" size="lg" className="btn-primary-custom text-white px-5 shadow">Go to Profile</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
