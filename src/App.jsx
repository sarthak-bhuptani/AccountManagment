import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Simple Landing Page
const Home = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">
          React Account<span className="text-primary block md:inline"> Manager</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          A simple, secure, and aesthetic way to manage your user profile.
          Built with React 18, Vite, and <span className="text-secondary font-semibold">Tailwind CSS</span>.
        </p>

        {!user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="btn-primary-custom text-lg px-8 py-3 shadow-xl"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Register
            </Link>
          </div>
        ) : (
          <Link
            to="/profile"
            className="btn-primary-custom text-lg px-8 py-3 shadow-xl"
          >
            Go to Profile
          </Link>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="antialiased text-gray-900">
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
