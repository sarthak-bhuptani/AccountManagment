import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar expand="lg" className="glass-card mb-4 mt-3 mx-3 py-3" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
                    AccountManager
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {user ? (
                            <>
                                <span className="me-3 text-muted d-none d-lg-block">Welcome, <strong>{user.name}</strong></span>
                                <Nav.Link as={Link} to="/profile" className={`nav-link-custom ${location.pathname === '/profile' ? 'active' : ''}`}>
                                    Profile
                                </Nav.Link>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="ms-lg-3 mt-2 mt-lg-0 rounded-pill px-4">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className={`nav-link-custom ${location.pathname === '/login' ? 'active' : ''}`}>
                                    Login
                                </Nav.Link>
                                <Button as={Link} to="/register" variant="primary" className="btn-primary-custom ms-lg-3 mt-2 mt-lg-0 text-white text-decoration-none">
                                    Get Started
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
