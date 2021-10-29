<template>
    <div class="w-full block clear-left md:p-6">
        <div>
            <h2 class="text-xl font-extrabold p-4 box-border">
                Popular ({{ type.toUpperCase() }})
            </h2>
        </div>
        <swiper
            class="relative"
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
