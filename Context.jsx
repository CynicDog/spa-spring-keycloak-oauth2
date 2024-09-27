import { createContext, useContext, useEffect, useState } from "react";
import {getUser} from "./src/data/data.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authenticate = async () => {
            try {
                const userData = await getUser();
                if (userData) {
                    setIsAuthenticated(true);
                    setUser(userData);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error("Authentication error:", error);
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        authenticate();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);