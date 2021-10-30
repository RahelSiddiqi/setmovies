import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/views/Home.vue';
import All from '/src/views/All.vue';
import Actor from '/src/views/Actor.vue';
import Actors from '/src/views/Actors.vue';
import Details from '/src/views/Details.vue';
import PageNotFound from '/src/views/PageNotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/actors',
        name: 'Actors',
        component: Actors,
    },
    {
        path: '/all/:type',
        name: 'All',
        component: All,
    },
    {
        path: '/actor/:id',
        name: 'Actor',
        component: Actor,
    },
    {
        path: '/details/:type/:id',
        name: 'Details',
        component: Details,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
    { path: '/:pathMatch(.*)', name: 'bad-not-found', component: PageNotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
