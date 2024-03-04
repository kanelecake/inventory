import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Welcome', component: () => import('@views/Welcome.vue') },
        { path: '/home', name: 'Home', component: () => import('@views/Home.vue') },
    ],
});