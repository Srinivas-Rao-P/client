import authService from "../config/authorizationServerConfig";

export const login = (username, password) => {
    return authService.post("/auth/login", {
        username: username.toLowerCase(),
        password: password
    });
}
export const logout = (token) => {
    return authService.post("/auth/logout", {
        token: token,
    });
}