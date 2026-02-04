import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const res = register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            bio: '',
            phone: ''
        });

        if (res.success) {
            navigate('/profile');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-lg p-8 md:p-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p className="text-gray-500">Join us to manage your profile</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Min 6 chars"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary-custom w-full mt-4 shadow-lg shadow-primary/30">
                        Create Account
                    </button>
                </form>

                <div className="text-center mt-6 text-sm">
                    <span className="text-gray-500">Already have an account? </span>
                    <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
