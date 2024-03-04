import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Welcome', component: () => import('@views/Welcome.vue') },
        { path: '/tasks', name: 'Tasks', component: () => import('@views/Tasks.vue') },
        { path: '/movements', name: 'Movements', component: () => import('@views/Movements.vue') },
    ],
});