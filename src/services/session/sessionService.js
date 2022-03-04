import server from "@/services/config/authorizationServerConfig";
// import store from "@/store"

// let lastRefresh = new Date()

function refreshToken() {
    server.post("/auth/refreshToken", { token: window.refreshToken })
        .then(response => {
            if (response.data.accessToken) {
                window.token = response.data.accessToken;
                // Vue.$cookies.set("token", window.token);
                localStorage.setItem("accessToken", window.token);
            } else {
                console.log("token not found");
            }
        })
}

// function invalidateToken() {
//     server.post("/auth/refreshToken",
//         { token: window.token }).then(response => {
//             console.log("token invalidated: " + response.data.token);
//             //window.$cookies.set("API_TOKEN", "tokenIsEmpty");
//             window.$cookies.set("DATA_SOURCE", window.dataSource);
//         })
// }

// function keepAlive() {
//     let currentDate = new Date()
//     let secs = (currentDate - lastRefresh) / 1000
//     if (secs > 180) {
//         lastRefresh = currentDate
//         refreshToken()
//     }

//display message
// if (secs > 1800) {
//     console.log("Your session has expired. Please login again");
//     store.commit("sessionExpired", true);
// }

// }


export default {
    // keepAlive,
    refreshToken,
    // invalidateToken
}
