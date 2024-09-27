import Azure from "../assets/Azure.jsx";

const AzureAuthButton = ({azureLoginUrl, message}) => {

    return (
        <>
            <div style={{ margin: "5px"}}>
                <button onClick={() => { window.location.href = azureLoginUrl; }}>
                    <Azure /> {message}
                </button>
            </div>
        </>
    )
}

export default AzureAuthButton