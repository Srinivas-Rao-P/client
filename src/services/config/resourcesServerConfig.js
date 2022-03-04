import axios from "axios";
import Vue from "vue";
import router from "@/router/index"
import { logout } from "@/services/login/loginService";
// import router from "../../router";
// import VueJwtDecode from "vue-jwt-decode";
// import vueCookies from "vue-cookies";
//import {READ_TOKEN,API_URL} from "../../../public/config.js";
// import yellowConfig from "@/services/config/YellowServerConfig";
// import BootstrapVue from "bootstrap-vue"

// Vue.use(vueCookies);
// Vue.use(BootstrapVue);
// console.log("READ_TOKEN: "+window.READ_TOKEN)
// console.log("API_URL: "+window.API_URL)

//reads the cookie with authorization data
// if (window.READ_TOKEN === true) {
//     window.user = JSON.parse(localStorage.getItem('user'))
//     window.token = window.user.accessToken
//     console.log("token: " +window.token)
//     if (window.token == null) {
//         console.log("token has expired");
//         router.push('/login')          
//     }
//     let decoded = VueJwtDecode.decode(window.token)
//     console.log(decoded);
// window.companyId = decoded.companyId
// window.personId = decoded.id
// window.userId = decoded.userId.trim()
// window.dataSource = decoded.dataSource.trim()
// window.userRoles = decoded.userRoles.split(",");
// window.$cookies.set("DATA_SOURCE", window.dataSource)
// } 
// else {
//     console.warn("token will be generated via API")
//     window.dataSource = window.location.host.split(".")[1] ? window.location.host.split(".")[0] : false;
//     let token = Vue.$cookies.get("API_TOKEN");
//     token = Vue.$cookies.get("API_TOKEN");
//     //console.log(token);
//     if ( token && (token !== "tokenIsEmpty") ){
//         let decoded = VueJwtDecode.decode(token);
//         window.personId = decoded.personId.trim()
//         window.userId = decoded.userId.trim()
//         window.companyId = decoded.companyId
//         window.userRoles = decoded.userRoles.split(",");
//         window.dataSource = decoded.dataSource.trim()
//         //console.warn("token will be generated via the new API")
//         window.token = Vue.$cookies.get("API_TOKEN");
// }
// }


//console.log("apiUrl Request : " +process.env.VUE_APP_API_URL);
//console.log("window.token on request: " +window.token);


const ResourcesServer = axios.create({
    baseURL: window.API_URL
});

Vue.prototype.$http = ResourcesServer;
const vm = new Vue();

ResourcesServer.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    vm.$toast.error("Data Entry Error");
                    break;
                case 401:
                    vm.$toast.error("Session expired!");
                    logout(window.refreshToken)
                        .then((response) => {
                            if (response.data) {
                                localStorage.removeItem("token");
                                localStorage.removeItem("refreshToken");
                                router.go();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    break;
                case 403:
                    vm.$toast.error("Access denied!");
                    break;
                case 404:
                    vm.$toast.error("Resource not found");
                    break;
                case 409:
                    vm.$toast.error("This Record already exists!");
                    break;
                case 502:
                    vm.$toast.error("There was an Error processing your Request");
                    break;
                default:
                    vm.$toast.error("There was an Error processing your Request");
            }
            return Promise.reject(error.response);
        }
    }
);

ResourcesServer.interceptors.request.use(function (config) {
    if (window.token) {
        config.headers["Authorization"] = "Bearer " + window.token;
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Content-Type"] = "application/json";
        config.headers["accept"] = "application/json";
        config.headers["applicationType"] = "web";
        config.headers["Accept-Language"] = "en";
        return config;
    } else {
        console.log("error: token not found");
    }


});

export default ResourcesServer;
