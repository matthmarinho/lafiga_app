import { sendToken, sendUserInfo } from "../screens/Login/LoginModal";
export const getToken = sendToken;
export const TOKEN_KEY = "@lafiga-token";
export const USER_INFO = "@user-info";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const userData = () => JSON.parse(localStorage.getItem(USER_INFO));
console.log(userData);
// export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (auth) => {
  console.log(auth);
  const { auth_token, user_infos } = auth;
  localStorage.setItem(TOKEN_KEY, auth_token);
  localStorage.setItem(USER_INFO, JSON.stringify(user_infos));
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
