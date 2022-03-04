import authService from "../config/authorizationServerConfig";

export const register = (username, password) => {
    return authService.post("/auth/register", {
        username: username.toLowerCase(),
        password: password
    });
}
