<template>
    <swiper
        class="relative"
        parallax
        grabCursor
        :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
        }"
    >
        <swiper-slide
            class="flex item-center h-52 w-full"
            v-for="movie in slides"
            :key="movie.id"
        >
            <div
                class="parallax-slide-image relative"
                :data-swiper-parallax="parallaxAmount"
                :data-swiper-parallax-opacity="0.5"
            >
                <img :src="originalImage(movie.backdrop_path)" />
            </div>
            <div class="absolute w-full h-full bg-gray-100 bottom-1 glass px-2">
                <p class="text-white font-bold">
                    {{ movie.title }}
                    <span class="font-semibold"
                        >({{ movie.release_date }})</span
                    >
                </p>
                <button class="btn play">Watch</button>
                <button class="btn trailer">Trailer</button>
            </div>
            <div class="absolute w-1/3 h-full top-1 right-1 px-2">
                <img :src="shortImage(movie.poster_path)" />
            </div>
        </swiper-slide>
    </swiper>
</template>

<script>
import { useStore } from 'vuex';
import SwiperCore, { Autoplay, Parallax } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';
import apiConfig from './../services/tmdb/apiConfig';
SwiperCore.use([Autoplay, Parallax]);
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const parallaxAmount = computed(() => 0.05);
        const { dispatch, getters } = useStore();
        const originalImage = apiConfig.originalImage;
        const shortImage = apiConfig.w500Image;
        const slides = computed(() => getters['movies/getSlide']);

        dispatch('movies/GET_POPULAR', { page: 1 });
        return { parallaxAmount, slides, originalImage, shortImage };
    },
};
</script>
