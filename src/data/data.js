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

    console.log(data);

    return data;
}

// export const getRemoteData = async () => {
//     const response = await fetch('/remote-service/check', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//
//     if (!response.ok) {
//         throw new Error('Failed to fetch remote data');
//     }
//
//     const data = await response.json();
//     console.log(data);
//
//     return data;
// };
