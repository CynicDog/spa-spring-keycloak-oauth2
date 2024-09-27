import {createContext, useContext, useEffect, useState} from "react";
import {getCsrfToken} from "./util.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        // parse cookie and set auth state variables
        const token = getCsrfToken();

        if (token !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);