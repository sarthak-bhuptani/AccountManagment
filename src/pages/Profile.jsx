import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                bio: user.bio || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.name) {
            setError('Name is required');
            return;
        }

        const res = updateUser(formData);
        if (res.success) {
            setSuccess('Profile updated successfully');
            setIsEditing(false);
        } else {
            setError('Failed to update profile');
        }
    };

    if (!user) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="warning">Please log in to view this page.</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="glass-card border-0 p-4">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                                <h2 className="fw-bold text-primary m-0">My Profile</h2>
                                {!isEditing && (
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => setIsEditing(true)}
                                        className="rounded-pill px-4"
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>

                            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
                            {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

                            {isEditing ? (
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="name">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    disabled
                                                    title="Contact support to change email"
                                                />
                                                <Form.Text className="text-muted">Email cannot be changed.</Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="phone">
                                        <Form.Label>Phone Number (Optional)</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 234 567 8900"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="bio">
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself..."
                                        />
                                    </Form.Group>

                                    <div className="d-flex gap-2 justify-content-end">
                                        <Button variant="secondary" onClick={() => { setIsEditing(false); setSuccess(''); setError(''); }}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="submit" className="btn-primary-custom text-white">
                                            Save Changes
                                        </Button>
                                    </div>
                                </Form>
                            ) : (
                                <div className="profile-view">
                                    <Row className="mb-4 align-items-center">
                                        <Col sm={4} className="text-muted">Full Name</Col>
                                        <Col sm={8} className="fw-semibold fs-5 text-dark">{user.name}</Col>
                                    </Row>
                                    <Row className="mb-4 align-items-center">
                                        <Col sm={4} className="text-muted">Email</Col>
                                        <Col sm={8} className="fw-medium text-dark">{user.email}</Col>
                                    </Row>
                                    <Row className="mb-4 align-items-center">
                                        <Col sm={4} className="text-muted">Phone</Col>
                                        <Col sm={8} className="text-dark">{user.phone || <span className="text-muted fst-italic">Not provided</span>}</Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col sm={4} className="text-muted">Bio</Col>
                                        <Col sm={8} className="text-dark">{user.bio || <span className="text-muted fst-italic">No bio yet...</span>}</Col>
                                    </Row>

                                    <div className="bg-white p-3 rounded-3 mt-4 shadow-sm border">
                                        <small className="text-muted d-block mb-1">Account ID</small>
                                        <code className="text-primary">{user.id}</code>
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
