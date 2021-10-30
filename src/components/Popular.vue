<template>
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
                running: true,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }"
        >
            <swiper-slide
                class="flex float-left w-1/2 p-1 md:w-1/6"
                v-for="movie in popular"
                :key="movie.id"
            >
                <card
                    :movie="movie"
                    parent="popular"
                    :type="type == 'movies'"
                />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import Card from './Card.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import SwiperCore, { Autoplay, Parallax } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import apiConfig from './../services/tmdb/apiConfig';
SwiperCore.use([Autoplay, Parallax]);
export default {
    props: ['type'],
    components: {
        Card,
        Swiper,
        SwiperSlide,
    },
    setup(props) {
        const { dispatch, getters } = useStore();
        const originalImage = apiConfig.originalImage;
        const shortImage = apiConfig.w500Image;
        let popular = [];
        if (props.type === 'tvs') {
            popular = computed(() => getters['tvs/getPopular']);
            dispatch('tvs/GET_POPULAR', { page: 1 });
        } else if (props.type === 'movies') {
            popular = computed(() => getters['movies/getPopular']);
            dispatch('movies/GET_POPULAR', { page: 1 });
        }
        return { popular, originalImage, shortImage };
    },
};
</script>
