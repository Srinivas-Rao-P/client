import authService from "../config/authorizationServerConfig";

export const login = (username, password) => {
    return authService.post("/auth/login", {
        username: username.toLowerCase(),
        password: password
    });
}
export const candidateLogin = (email, token, candidateId) => {
    return authService.post("/auth/candidateLogin", {
        email: email.toLowerCase(),
        token: token,
        candidateId: candidateId
    });
}
export const logout = (token) => {
    return authService.post("/auth/logout", {
        token: token,
    });
}