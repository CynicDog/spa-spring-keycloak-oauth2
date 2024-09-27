import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isGitHubAuthenticated, setIsGitHubAuthenticated] = useState(false);
    const [isAzureAuthenticated, setIsAzureAuthenticated] = useState(false);

    useEffect(() => {

        // parse cookie and set auth state variables

    }, []);

    return (
        <AuthContext.Provider value={{
            isGitHubAuthenticated,
            isAzureAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);