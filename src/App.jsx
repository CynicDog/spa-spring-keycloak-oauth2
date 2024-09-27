import './App.css'
import GitHubAuthButton from "./component/GitHubAuthButton.jsx";
import AzureAuthButton from "./component/AzureAuthButton.jsx";
import {useAuth} from "../Context.jsx";

function App() {

    const {isGitHubAuthenticated, isAzureAuthenticated} = useAuth();

    const githubLoginUrl = import.meta.env.VITE_GITHUB_LOGIN_URL;
    const azureLoginUrl = import.meta.env.VITE_AZURE_LOGIN_URL

    return (
        <>
            <div style={{display: "flex"}}>
                {!isGitHubAuthenticated? (
                    <GitHubAuthButton githubLoginUrl={ githubLoginUrl }/>
                ): (
                    <GitHubAuthButton githubLoginUrl={ githubLoginUrl }/>
                    /* Further renders on fetched data with authenticated requests */
                )}
                {!isAzureAuthenticated? (
                    <AzureAuthButton azureLoginUrl={ azureLoginUrl }/>
                ): (
                    <AzureAuthButton azureLoginUrl={ azureLoginUrl }/>
                    /* Further renders on fetched data with authenticated requests */
                )}
            </div>
        </>
    )
}

export default App
