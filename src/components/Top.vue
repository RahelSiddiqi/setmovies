<template>
    <div class="top-movies">
        <h2
            class="
                uppercase
                tracking-wider
                text-orange-500 text-lg
                font-semibold
            "
        >
            Top Rated ({{ type.toUpperCase() }})
        </h2>

        <swiper
            class="
                grid grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-5
                gap-8
            "
            parallax
            grabCursor
            :lazy="true"
            :slidesPerView="6"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }"
        >
            <swiper-slide
                class="flex float-left w-1/2 p-1 md:w-1/6"
                v-for="movie in top_rated"
                :key="movie.id"
            >
                <card :movie="movie" parent="top" :type="type == 'movies'" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import Card from './Card.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import apiConfig from './../services/tmdb/apiConfig';
import SwiperCore, { Autoplay, Parallax } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
SwiperCore.use([Autoplay, Parallax]);
export default {
    components: { Card, Swiper, SwiperSlide },
    props: ['type'],
    setup(props) {
        const { dispatch, getters } = useStore();
        var top_rated = [];
        if (props.type === 'tvs') {
            top_rated = computed(() => getters['tvs/getPopular']);
            dispatch('tvs/GET_TOP_RATED', { page: 1 });
        } else if (props.type === 'movies') {
            top_rated = computed(() => getters['movies/getPopular']);
            dispatch('movies/GET_TOP_RATED', { page: 1 });
        }
        return { top_rated };
    },
};
</script>
