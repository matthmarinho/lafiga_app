export const TOKEN_KEY = "@lafiga-token"
export const USER_INFO = "@user-info"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const userData = () => JSON.parse(localStorage.getItem(USER_INFO))
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const login = (auth) => {
  const { token, user_infos } = auth
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_INFO, JSON.stringify(user_infos))
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_INFO)
}
