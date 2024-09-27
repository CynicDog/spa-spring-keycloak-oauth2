const LoginButton = () => {

    return (
        <>
            <div style={{margin: "5px"}}>
                <button onClick={() => { window.open('/oauth2/authorization/keycloak', '_self'); }}>
                    login
                </button>
            </div>
        </>
    )
}

export default LoginButton