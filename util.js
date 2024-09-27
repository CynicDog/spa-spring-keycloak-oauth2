export const getCsrfToken = () => {
    const csrfCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
};
