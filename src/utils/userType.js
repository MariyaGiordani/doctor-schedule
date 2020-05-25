export function userType() {
    const user_storage = sessionStorage.getItem('user');
    return user_storage;
}