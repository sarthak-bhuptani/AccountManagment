import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user data", error);
            localStorage.removeItem('currentUser');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            // Create session user object (exclude sensitive data if needed, but for edit we need it or re-fetch)
            // For simplicity in this interview task, we store everything but handle password carefully in real apps.
            setUser(foundUser);
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'User with this email already exists' };
        }

        const newUser = { ...userData, id: Date.now().toString() };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login
        setUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateUser = (updatedData) => {
        // updatedData contains the fields to update
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Update in the main 'users' array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const newUsersList = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(newUsersList));

        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
