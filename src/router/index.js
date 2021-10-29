import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/views/Home.vue';
import All from '/src/views/All.vue';
import PageNotFound from '/src/views/PageNotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/all/:type',
        name: 'All',
        component: All,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
    { path: '/:pathMatch(.*)', name: 'bad-not-found', component: PageNotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
