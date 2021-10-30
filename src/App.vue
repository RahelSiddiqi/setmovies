<template>
    <div class="main-container">
        <nav class="border-b border-gray-800">
            <div
                class="
                    container
                    mx-auto
                    px-4
                    flex flex-col
                    md:flex-row
                    items-center
                    justify-between
                    px-4
                    py-6
                "
            >
                <ul class="flex flex-col md:flex-row items-center">
                    <li>
                        <router-link
                            :to="{ name: 'Home' }"
                            class="font-extrabold"
                        >
                            SET MOVIES
                        </router-link>
                    </li>
                    <li class="md:ml-16 mt-3 md:mt-0">
                        <router-link
                            :to="{ name: 'All', params: { type: 'movies' } }"
                            class="hover:text-gray-300"
                            >Movies</router-link
                        >
                    </li>
                    <li class="md:ml-6 mt-3 md:mt-0">
                        <router-link
                            :to="{ name: 'All', params: { type: 'tvs' } }"
                            class="hover:text-gray-300"
                            >Tv Series</router-link
                        >
                    </li>
                    <li class="md:ml-6 mt-3 md:mt-0">
                        <router-link
                            :to="{ name: 'Actors' }"
                            class="hover:text-gray-300"
                            >Actors</router-link
                        >
                    </li>
                </ul>
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:ml-4 mt-3 md:mt-0">
                        <a href="#">
                            <img
                                src="/avatar.jpg"
                                alt="avatar"
                                class="
                                    rounded-md
                                    w-8
                                    h-8
                                    object-cover object-center
                                "
                            />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <router-view :key="$route.path"> </router-view>
        <footer class="border border-t border-gray-800">
            <div class="container mx-auto text-sm px-4 py-6">
                Powered by
                <a
                    href="https://www.themoviedb.org/documentation/api"
                    class="underline hover:text-gray-300"
                    >TMDb API</a
                >
            </div>
        </footer>
    </div>
</template>
<style scoped>
.route-enter-from {
    opacity: 0;
    transform: translateX(200px);
}
.route-enter-active {
    transition: all 0.05s ease-out;
}
.route-leave-to {
    opacity: 0;
    transform: translateX(-200px);
}
.route-leave-active {
    transition: all 0.05s ease-out;
}
</style>
