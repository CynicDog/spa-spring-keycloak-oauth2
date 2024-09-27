import Azure from "../assets/Azure.jsx";

const AzureAuthButton = ({azureLoginUrl}) => {

    return (
        <>
            <div style={{ margin: "5px"}}>
                <button onClick={() => { window.location.href = azureLoginUrl; }}>
                    <Azure />
                </button>
            </div>
        </>
    )
}

export default AzureAuthButton