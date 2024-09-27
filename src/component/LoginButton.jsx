import GitHub from "../assets/GitHub.jsx";

const LoginButton = () => {

    return (
        <>
            <div style={{margin: "5px"}}>
                <button onClick={() => { window.open('/oauth2/authorization/keycloak', '_self'); }}>
                    <GitHub />
                </button>
            </div>
        </>
    )
}

export default LoginButton