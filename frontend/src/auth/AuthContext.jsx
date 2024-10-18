import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // State to store user data

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
            }
        }
    }, []);

    const login = (userData) => { // Expecting userData to include token, email, permissions
        localStorage.setItem('token', userData.token); // Store token in local storage
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData.user)); // Save the user details
        setIsAuthenticated(true);
        setUser({
            email: userData.user.email,
            firstName: userData.user.firstName,
            lastName: userData.user.lastName,
            permissions: userData.user.permissions,
            role: userData.role,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Modified useAuth hook to destructure user data
export const useAuth = () => {
    const { user, ...rest } = useContext(AuthContext);
    const email = user?.email || null;
    const permissions = user?.permissions || [];
    return { email, permissions, ...rest };
};
