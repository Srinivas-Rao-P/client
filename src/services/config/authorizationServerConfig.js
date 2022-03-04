import axios from "axios";
axios.defaults.baseURL = window.API_URL;

const loginServer = axios.create({
    baseURL: window.API_URL
});

loginServer.interceptors.request.use(function (config) {

    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Content-Type"] = "application/json";
    config.headers["accept"] = "application/json";

    return config;
});


export default loginServer;
