import GitHub from "../assets/GitHub.jsx";

const GitHubAuthButton = ({githubLoginUrl}) => {

    return (
        <>
            <div style={{margin: "5px"}}>
                <button onClick={() => { window.location.href = githubLoginUrl; }}>
                    <GitHub />
                </button>
            </div>
        </>
    )
}

export default GitHubAuthButton