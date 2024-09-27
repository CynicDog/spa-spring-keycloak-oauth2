export const getUser = async () => {

    const response = await fetch('/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data = await response.json();

    return data;
}