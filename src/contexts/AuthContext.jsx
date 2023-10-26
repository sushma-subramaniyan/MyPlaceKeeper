import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            login(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    
    const login = async (token) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                localStorage.setItem("jwtToken", token);
                setToken(token);
                const decodedToken = jwt_decode(token);
                setUser(decodedToken);
            } else {
                logout();
            }

        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    };

    const fetchWithToken = async (endpoint, method, body, callback) => {
        try {
            const response = await fetch(`$`, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                callback();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, fetchWithToken, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
