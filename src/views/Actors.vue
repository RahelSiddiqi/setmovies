<template>
    <div class="container mx-auto px-4 py-16">
        <div class="popular-actors">
            <h2
                class="
                    uppercase
                    tracking-wider
                    text-orange-500 text-lg
                    font-semibold
                "
            >
                Popular Actors
                <input
                    type="text"
                    v-model="keyword"
                    placeholder="serach movies/tvs"
                    class="
                        ml-20
                        bg-gray-800
                        text-sm
                        rounded-full
                        w-64
                        px-4
                        pl-8
                        py-1
                        focus:outline-none focus:shadow-outline
                    "
                    @keydown.enter="search"
                />
            </h2>
            <transition-group
                appear
                name="staggered-fade"
                tag="div"
                :css="false"
                @before-enter="beforeEnter"
                @enter="enter"
                class="
                    grid grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-5
                    gap-8
                "
            >
                <div
                    class="actor mt-8"
                    v-for="(actor, index) in resources"
                    :key="actor.id"
                    :data-order="index"
                >
                    <router-link
                        :to="{
                            name: 'Actor',
                            params: {
                                id: actor.id,
                            },
                        }"
                    >
                        <img
                            :src="
                                shortImage(
                                    actor.profile_path ??
                                        '/qqKrUA9KuE7r5WJy0jljl6KvxEv.jpg'
                                )
                            "
                            alt="profile image"
                            class="
                                hover:opacity-75
                                transition
                                ease-in-out
                                duration-150
                            "
                        />
                    </router-link>
                    <div class="mt-2">
                        <a class="text-lg hover:text-gray-300">{{
                            actor.name
                        }}</a>
                        <div class="text-sm truncate text-gray-400">
                            <span
                                v-for="known in actor.known_for"
                                :key="known.id"
                                >{{ known.title ?? known.name }}</span
                            >
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="flex items-center m-5">
            <button
                type="button"
                @click="loadMore"
                class="
                    m-auto
                    inline-block
                    align-middle
                    btn-outline-primary
                    transition
                    duration-300
                    ease-in-out
                    focus:outline-none focus:shadow-outline
                    border border-purple-700
                    hover:bg-purple-700
                    text-purple-700
                    hover:text-white
                    font-normal
                    py-2
                    px-4
                    rounded
                "
            >
                Load More
            </button>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import apiConfig from './../services/tmdb/apiConfig';
import annimation from '../services/annimation';
export default {
    components: { Card },
    setup() {
        const shortImage = apiConfig.w500Image;
        const { dispatch, getters } = useStore();
        const route = useRoute();
        var resources = [];
        const keyword = ref('');
        var page = 1;

        const loaddata = async function () {
            resources = computed(() => getters['actors/getPopular']);
            dispatch('actors/GET_POPULAR');
        };
        loaddata();

        const search = async () => {
            if (keyword.value === '') {
                loaddata();
            } else {
                const params = {
                    query: keyword.value,
                };

                resources = computed(() => getters['actors/getPopular']);
                dispatch('actors/SEARCH', params);
            }
        };

        const loadMore = async () => {
            console.log(keyword.value);
            if (keyword.value === '') {
                const params = {
                    page: page + 1,
                };
                page++;

                dispatch('actors/GET_POPULAR', params);
            } else {
                const params = {
                    page: page + 1,
                    query: keyword.value,
                };
                page++;

                dispatch('actors/SEARCH', params);
            }
        };
        const beforeEnter = annimation.beforeEnter;
        const enter = annimation.enter;
        return {
            resources,
            loadMore,
            search,
            keyword,
            shortImage,
            beforeEnter,
            enter,
        };
    },
};
</script>
