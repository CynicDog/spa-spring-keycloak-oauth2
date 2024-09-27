import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        // parse cookie and set auth state variables

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