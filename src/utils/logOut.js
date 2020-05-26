export const logOut = () => {
  sessionStorage.clear();
  window.location.reload();
};