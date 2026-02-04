import React, { useState, useEffect } from 'react';
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
            <div className="mt-10 px-4 text-center">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 inline-block rounded" role="alert">
                    <p>Please log in to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-10 px-4 max-w-4xl mx-auto">
            <div className="glass-card p-6 md:p-10">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                    <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded text-green-700">
                        {success}
                    </div>
                )}

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    className="form-input bg-gray-100 cursor-not-allowed opacity-75"
                                    disabled
                                    title="Contact support to change email"
                                />
                                <p className="mt-1 text-xs text-gray-500">Email cannot be changed.</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                                Phone Number (Optional)
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 8900"
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bio">
                                Bio
                            </label>
                            <textarea
                                rows={3}
                                name="bio"
                                id="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Tell us about yourself..."
                                className="form-input resize-y"
                            />
                        </div>

                        <div className="flex gap-4 justify-end pt-4">
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setSuccess(''); setError(''); }}
                                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary-custom"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-50 pb-4">
                            <div className="text-gray-500 font-medium">Full Name</div>
                            <div className="sm:col-span-2 font-semibold text-xl text-gray-900">{user.name}</div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-50 pb-4">
                            <div className="text-gray-500 font-medium">Email</div>
                            <div className="sm:col-span-2 text-gray-900">{user.email}</div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-50 pb-4">
                            <div className="text-gray-500 font-medium">Phone</div>
                            <div className="sm:col-span-2 text-gray-900">
                                {user.phone ? user.phone : <span className="text-gray-400 italic">Not provided</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="text-gray-500 font-medium">Bio</div>
                            <div className="sm:col-span-2 text-gray-700 leading-relaxed">
                                {user.bio ? user.bio : <span className="text-gray-400 italic">No bio yet...</span>}
                            </div>
                        </div>

                        <div className="mt-8 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                            <span className="text-xs text-uppercase text-gray-400 font-bold tracking-wider block mb-1">ACCOUNT ID</span>
                            <code className="text-sm text-primary bg-indigo-50 px-2 py-1 rounded">{user.id}</code>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
