import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const res = login(email, password);
        if (res.success) {
            navigate('/profile');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md p-8 md:p-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-500">Login to manage your account</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary-custom w-full shadow-lg shadow-primary/30">
                        Log In
                    </button>
                </form>

                <div className="text-center mt-6 text-sm">
                    <span className="text-gray-500">Don't have an account? </span>
                    <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
