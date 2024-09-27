import GitHub from "../assets/GitHub.jsx";

const GitHubAuthButton = ({githubLoginUrl, message}) => {

    return (
        <>
            <div style={{margin: "5px"}}>
                <button onClick={() => { window.location.href = githubLoginUrl; }}>
                    <GitHub /> {message}
                </button>
            </div>
        </>
    )
}

export default GitHubAuthButton