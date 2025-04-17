import Cookies from "js-cookie";

const TokenKey = "Admin-Token";
export function getToken() {
  return localStorage.getItem(TokenKey);
  // return Cookies.get(TokenKey);
}
export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
  // return Cookies.set(TokenKey, token);
}

export function removeToken() {
  localStorage.removeItem("loginInfo");
  localStorage.removeItem("loginUserId");
  localStorage.removeItem("perms");
  localStorage.removeItem("image");
  return localStorage.removeItem(TokenKey);
  // return Cookies.remove(TokenKey);
}
