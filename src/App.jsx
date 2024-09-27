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
                    <GitHubAuthButton githubLoginUrl={ githubLoginUrl } message={"Login"} />
                ): (
                    <GitHubAuthButton githubLoginUrl={ githubLoginUrl } message={"Logout"} />
                    /* Further renders on fetched data with authenticated requests */
                )}
                {!isAzureAuthenticated? (
                    <AzureAuthButton azureLoginUrl={ azureLoginUrl } message={"Login"} />
                ): (
                    <AzureAuthButton azureLoginUrl={ azureLoginUrl } message={"Logout"} />
                    /* Further renders on fetched data with authenticated requests */
                )}
            </div>
        </>
    )
}

export default App
