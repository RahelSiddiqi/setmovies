<template>
    <div class="container mx-auto px-4 pt-16">
        <div class="popular-movies">
            <h2
                class="
                    uppercase
                    tracking-wider
                    text-orange-500 text-lg
                    font-semibold
                "
            >
                Popular {{ type }}
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
                <card
                    v-for="(movie, index) in resources"
                    :key="movie.id"
                    :data-order="index"
                    :movie="movie"
                    parent="popular"
                    :type="type == 'movies'"
                />
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
import annimation from '../services/annimation';
export default {
    components: { Card },
    setup() {
        const { dispatch, getters } = useStore();
        const route = useRoute();
        const { type } = route.params;
        var resources = [];
        const keyword = ref('');
        var page = 1;

        const loaddata = async function (type) {
            switch (type) {
                case 'tvs':
                    resources = computed(() => getters['tvs/getPopular']);
                    dispatch('tvs/GET_POPULAR');
                    break;
                case 'movies':
                    resources = computed(() => getters['movies/getPopular']);
                    dispatch('movies/GET_POPULAR');
                    break;
            }
        };
        loaddata(type);

        const search = async () => {
            if (keyword.value === '') {
                loaddata(type);
            } else {
                const params = {
                    query: keyword.value,
                };
                switch (type) {
                    case 'tvs':
                        resources = computed(() => getters['tvs/getPopular']);
                        dispatch('tvs/SEARCH', params);
                        break;
                    case 'movies':
                        resources = computed(
                            () => getters['movies/getPopular']
                        );
                        dispatch('movies/SEARCH', params);
                        break;
                }
            }
        };

        const loadMore = async () => {
            console.log(keyword.value);
            if (keyword.value === '') {
                const params = {
                    page: page + 1,
                };
                page++;
                switch (type) {
                    case 'movies':
                        dispatch('movies/GET_POPULAR', params);
                        break;
                    case 'tvs':
                        dispatch('tvs/GET_POPULAR', params);
                        break;
                }
            } else {
                const params = {
                    page: page + 1,
                    query: keyword.value,
                };
                page++;
                switch (type) {
                    case 'movies':
                        dispatch('movies/SEARCH', params);
                        break;
                    case 'tvs':
                        dispatch('tvs/SEARCH', params);
                        break;
                }
            }
        };
        const beforeEnter = annimation.beforeEnter;
        const enter = annimation.enter;

        return {
            type,
            resources,
            loadMore,
            search,
            keyword,
            beforeEnter,
            enter,
        };
    },
};
</script>
