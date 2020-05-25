export function isUserLogged() {
    const access_token_storage = sessionStorage.getItem('token');
    return !!access_token_storage;
}