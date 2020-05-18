export function isUserLogged() {
    const access_token_storage = localStorage.getItem('token');
    return !!access_token_storage;
}