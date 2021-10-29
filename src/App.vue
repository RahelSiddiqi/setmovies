<template>
    <div>
        <header>
            <ul class="flex justify-between">
                <li class="mr-3">
                    <router-link :to="{ name: 'Home' }" class="nav"
                        >Home</router-link
                    >
                </li>
                <li class="mr-3">
                    <router-link
                        :to="{ name: 'All', params: { type: 'movies' } }"
                        class="nav"
                        >Movies</router-link
                    >
                </li>
                <li class="mr-3">
                    <router-link
                        :to="{ name: 'All', params: { type: 'tvs' } }"
                        class="nav"
                        >Tv Series</router-link
                    >
                </li>
            </ul>
        </header>
        <router-view :key="$route.fullPath" />
    </div>
</template>
