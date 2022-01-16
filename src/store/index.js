import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:8081/api'

export default new Vuex.Store({
    state: {
        // token: localStorage.getItem('accessToken') || null,
        activeSession: false,
    },
    mutations: {
        // retrieveToken(state, token) {
        //     state.token = token
        // },
        // destroyToken(state) {
        //     state.token = null
        // },
        sessionExpired(state, payload){
            state.activeSession = payload;
            console.log("state change");
          },
    },
    actions: {
        // destroyToken(context) {
        //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

        //     if (context.getters.loggedIn) {
        //         return new Promise((resolve, reject) => {
        //             axios.post('/logout')
        //                 .then(response => {
        //                     localStorage.removeItem('access_token')
        //                     context.commit('destroyToken')
        //                     resolve(response)
        //                     // console.log(response);
        //                     // context.commit('addTodo', response.data)
        //                 })
        //                 .catch(error => {
        //                     localStorage.removeItem('access_token')
        //                     context.commit('destroyToken')
        //                     reject(error)
        //                 })
        //         })
        //     }
        // }

    },
    getters: {
        // loggedIn(state) {
        //     return state.token !== null
        // },
    },
    modules: {

    }
})
