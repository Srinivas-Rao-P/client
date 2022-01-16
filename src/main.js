import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import VueI18n from "vue-i18n"
import { messages } from "@/translations/root.js"
import vuetify from '@/plugins/vuetify'
import VueJwtDecode from "vue-jwt-decode"

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const options = {

  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true,
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  }

}

Vue.use(Toast, options);

const decodeToken = (token) => {
  let decoded = VueJwtDecode.decode(token)
  window.companyId = decoded.companyId
  window.personId = decoded.id
  window.name = decoded.name
  // window.baseRealUserId = decoded.baseRealUserId.trim()
  // window.dataSource = decoded.dataSource.trim()
  window.userRole = decoded.userRole;
  // Vue.$cookies.set("DATA_SOURCE", window.dataSource)
  return decoded
}

// const options = {
//   token: () => window.token,
// }

Vue.config.productionTip = false
Vue.use(VueI18n);
const vm = new Vue();
// Vue.use(VueAuthHref, options);

export const i18n = new VueI18n({
  locale: "en", // set locale
  messages, // set locale messages
})


router.beforeEach((to, from, next) => {
  // window.token = Vue.$cookies.get("accessToken")

  window.token = localStorage.getItem('token')
  window.refreshToken = localStorage.getItem(' refreshToken')
  if (!window.token || window.token == null) {
    vm.$toast.error("Token not found");
  } else if (Date.now() >= (VueJwtDecode.decode(window.token).exp) * 1000) {
    vm.$toast.error("Session expired!");
  } else {
    decodeToken(window.token);
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!window.token) {
      next({
        name: "login",
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (window.token) {
      next({
        name: "home",
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount("#app")