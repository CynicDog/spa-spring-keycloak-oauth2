import {getCsrfToken} from "../../util.js";

export const fetchUsers = async () => {

    const token = getCsrfToken();

    const response = await fetch('/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': token // Include the CSRF token
        },
        credentials: 'include' // Send cookies (SESSION, etc.) with the request
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data;
}