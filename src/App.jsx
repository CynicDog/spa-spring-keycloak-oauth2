import './App.css'
import LoginButton from "./component/LoginButton.jsx";
import {useAuth} from "../Context.jsx";

function App() {

    const { isUserAuthenticated } = useAuth();

    return (
        <>
            <div style={{display: "flex"}}>
                {!isUserAuthenticated? (
                    <LoginButton />
                ): (
                    <>
                        /* Further renders on fetched data with authenticated requests */
                    </>
                )}
            </div>
        </>
    )
}

export default App
