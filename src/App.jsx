import './App.css'
import {useAuth} from "../Context.jsx";
import LoginButton from "./component/LoginButton.jsx";
import {useQuery} from "react-query";
import {getRemoteData} from "./data/data.js";


const App = () => {

    const { isAuthenticated } = useAuth();

    const { data: remoteData, error, isLoading } = useQuery(
        ['remoteData'],
        getRemoteData,
        {
            enabled: isAuthenticated,
        }
    );

    return (
        <>
            {isAuthenticated ? (
                <>
                    Logged in.
                    { isLoading && <p>Loading...</p> }
                    { error && <p>Error: {error.message}</p> }
                    { remoteData && <p>{remoteData}</p> }
                </>
            ) : (
                <LoginButton />
            )}
        </>
    );
};

export default App;
