export function userType() {
    const user_storage = localStorage.getItem('user');
    return user_storage;
}