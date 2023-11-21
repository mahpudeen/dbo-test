import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js";

Vue.use(VueRouter)
/**
 * Automatically register other routes
 * every .js file in the directory display that has routes.js
 * will be registered as a route
 */
let path = []
let route = []
const comps = require.context('../views/', true, /\.(js)$/i);
comps.keys().map(key => {
    path.push(comps(key).default)
});
path.forEach((value, index) => {
    if (value !== undefined) {
        value.forEach((c, index) => {
            route.push(c)
        });
    }
});
route.push({
    path: "/",
    name: "login",
    component: function () {
        return import('../views/LoginView.vue')
    },
    meta: {
        title: "Login",
        guest: true
    }
})
route.push({
    path: '/home',
    name: 'home',
    component: function () {
        return import('../views/HomeView.vue')
    },
    meta: {
        title: 'Home',
        auth : true
    }
})
let router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: route,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (store.getters.isLoggedIn !== '' && to.path !== '/') {
            next();
        } else {
            next({
                path: "/",
            });
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.getters.isLoggedIn !== '' && to.path === '/') {
            next({
                path: "/home",
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
