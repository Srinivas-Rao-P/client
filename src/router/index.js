import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/components/auth/Login"),
        
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/components/auth/Register"),
        meta: {
            requiresVisitor: true,
        }
    },

    {
        path: "/resetPassword/:token?",
        name: "resetpassword",
        component: () => import("@/components/auth/Resetpassword"),
        props: true,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/views/home/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/profile",
        name: "profile",
        props: true,
        component: () => import("@/views/profile/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/mycontactinfo",
        name: "mycontactinfo",
        component: () => import("@/components/Mycontactinfo"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/mypay",
        name: "mypay",
        component: () => import("@/components/Mypay"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "*",
        component: () => import("@/components/PageNotFound"),
        meta: {
            requiresAuth: true,
        }
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});
export default router;
