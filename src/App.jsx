import { useQuery } from 'react-query';
import {fetchUsers} from "./data/user.js";
import {useAuth} from "../Context.jsx";
import LoginButton from "./component/LoginButton.jsx";


const UsersList = () => {

    const { isAuthenticated } = useAuth();
    const { data: users = [], error, isLoading } = useQuery(
        'users',
        () => fetchUsers(),
        {
            enabled: isAuthenticated
        });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching users data: {error.message}</div>;
    }

    return (
        <>
            {isAuthenticated ? (
                <>
                    <div>
                        <h2>User Profiles</h2>
                        {users.map((user) => (
                            <div key={user.username}>
                                <p>Username: {user.username}</p>
                            </div>
                        ))}
                    </div>
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
