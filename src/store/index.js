import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:8081/api'

export default new Vuex.Store({
    state: {
        // token: localStorage.getItem('accessToken') || null,
        isMobile: false,
        activeSession: false,
        showSpinner: false,
        mainMenu: [],
    },
    mutations: {
        // retrieveToken(state, token) {
        //     state.token = token
        // },
        // destroyToken(state) {
        //     state.token = null
        // },
        saveMainMenu(state, payload) {
            state.mainMenu = payload
        },
        sessionExpired(state, payload) {
            state.activeSession = payload;
            console.log("state change");
        },
        setSpinner(state, value) {
            state.showSpinner = value;
        },
        setMobile(state, value) {
            state.isMobile = value
        },

    },
    actions: {
        saveMainMenu(context, payload) {
            // context.dispatch("parseMainMenu", payload).then(result => {
                context.commit("saveMainMenu", payload)
            // })
        },
        parseMainMenu(context, payload) {
            return payload.map(e => {
    
                let result = {
                    
                    component: e.component ? e.component : null,
                    expandable: e.expandable ? e.expandable : null,
                    
                    name: e.name ? e.name : null,
                    type: e.type ? e.type : null,
                    link: e.link ? e.link : null,
                    showDragIcon: true
                }
    
                if (e.menuItems)
                    context.dispatch("parseMainMenu", e.menuItems).then(result2 => {
                        result.menuItems = result2
                    })
    
                return result
            })
        },
        getMenuItems(context, payload) {
            return [getMenuFromList(context.state.mainMenu, payload)].map(menu => {
                return {
                    ...menu,
                    menuItems: menu.menuItems?.filter(subMenu => subMenu.showDragIcon)
                }
            })[0]
        },
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
        setSpinner({ commit }, value) {
            commit("setSpinner", value)
        },
        setMobile({ commit }, value) {
            commit("setMobile", value)
        },

    },
    getters: {
        // loggedIn(state) {
        //     return state.token !== null
        // },
        getMainMenu(state) {
            return state.mainMenu
        },
        getSpinner(state) {
            return state.showSpinner
        },
        isMobile(state) {
            return state.isMobile
        },
    },
    modules: {

    }
    
})
function getMenuFromList(list, find) {
    let finding = null
    list.forEach(e => {
        if (e.name === find) {
            finding = e
            return;
        }
        if (e.menuItems) {
            let findingFromMenuItem = getMenuFromList(e.menuItems, find)
            if (findingFromMenuItem !== null) {
                finding = findingFromMenuItem
                return;
            }
        }
    })
    return finding
}