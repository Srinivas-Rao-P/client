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
export const generateOtp = (username) => {
    return authService.post("/auth/generateOtp", {
        username: username.toLowerCase()
    });
}
export const verifyOtp = (username, otp) => {
    return authService.post("/auth/verifyOtp", {
        username: username,
        otp: otp
    });
}
export const resetPassword = (username, password, otp) => {
    return authService.post("/auth/resetPassword", {
        username: username,
        password: password,
        otp: otp
    });
}
export const logout = (token) => {
    return authService.post("/auth/logout", {
        token: token,
    });
}