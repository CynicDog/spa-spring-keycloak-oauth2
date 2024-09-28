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

    return await response.json();
}

export const getRemoteData = async () => {
    const response = await fetch('/remote-service/check', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch remote data');
    }

    return await response.text();
};
