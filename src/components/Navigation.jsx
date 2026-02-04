import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path ? 'text-primary font-semibold' : 'text-gray-500 hover:text-primary';

    return (
        <nav className="glass-card m-4 px-6 py-4 sticky top-4 z-50">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
                    Account<span className="text-secondary">Manager</span>
                </Link>

                {/* Mobile menu button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-gray-600 hover:text-primary focus:outline-none"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    {user ? (
                        <>
                            <span className="text-gray-500">Welcome, <strong className="text-gray-800">{user.name}</strong></span>
                            <Link to="/profile" className={`transition-colors duration-200 ${isActive('/profile')}`}>
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-all text-sm font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={`transition-colors duration-200 ${isActive('/login')}`}>
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn-primary-custom"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-4">
                    {user ? (
                        <>
                            <span className="text-gray-500 text-sm">Signed in as <strong className="text-gray-800">{user.name}</strong></span>
                            <Link
                                to="/profile"
                                className={`block py-2 ${isActive('/profile')}`}
                                onClick={() => setIsOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-left py-2 text-red-500 font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`block py-2 ${isActive('/login')}`}
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn-primary-custom text-center block"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
