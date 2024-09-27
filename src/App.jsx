import {useAuth} from "../Context.jsx";
import LoginButton from "./component/LoginButton.jsx";


const UsersList = () => {

    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <>
                    Welcome.
                </>
            ): (
                <>
                    <LoginButton />
                </>
            )}
        </>
    );
};

export default UsersList;
