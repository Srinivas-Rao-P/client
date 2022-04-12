import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/components/auth/Login"),
        meta: {
            requiresVisitor: true,
        },
        props: true
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
        path: "/profile/:personId?",
        name: "profileindex",
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
        path: "/managemenus",
        name: "managemenus",
        component: () => import("@/views/managemenus/index"),
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
        path: "/manageemployee",
        name: "manageemployee",
        props: true,
        component: () => import("@/views/manageemployee/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/mytime",
        name: "mytime",
        props: true,
        component: () => import("@/views/mytime/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/timeoffrequest",
        name: "timeoffrequest",
        props: true,
        component: () => import("@/views/mytime/timeoffrequest"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/communications",
        name: "communications",
        props: true,
        component: () => import("@/views/communications/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/emergencycontacts/:personId?",
        name: "emergencycontacts",
        props: true,
        component: () => import("@/views/emergencycontacts/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/documents/:personId?",
        name: "documents",
        props: true,
        component: () => import("@/views/documents/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/bankdetails/:personId?",
        name: "bankdetails",
        props: true,
        component: () => import("@/views/bankdetails/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/newhire",
        name: "newhire",
        props: true,
        component: () => import("@/views/newhire/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/candidatelogin/:candidateId/:candidateToken",
        name: "candidatelogin",
        props: true,
        component: () => import("@/views/candidatelogin/index"),
    },
    {
        path: "/viewcandidate/:candidateId",
        name: "Viewcandidate",
        props: true,
        component: () => import("@/components/newhire/Viewcandidate"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/navbar/:personId",
        name: "navbar",
        props: true,
        component: () => import("@/views/navbar/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/manageroles",
        name: "manageroles",
        component: () => import("@/views/manageroles/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/manageuserroles",
        name: "manageuserroles",
        component: () => import("@/views/manageuserroles/index"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/passwordpolicy",
        name: "passwordpolicy",
        component: () => import("@/views/passwordpolicy/index"),
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
    baseUrl: '/',
    mode: 'history'
});
export default router;
