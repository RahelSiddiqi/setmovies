<template>
    <div class="movie-info border-b border-gray-800">
        <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
            <div class="flex-none">
                <img
                    :src="shortImage(movie.poster_path)"
                    alt="poster"
                    class="w-64 lg:w-96"
                />
            </div>
            <div class="md:ml-24">
                <h2 class="text-4xl mt-4 md:mt-0 font-semibold">
                    {{ movie.title }}
                </h2>
                <div class="flex flex-wrap items-center text-gray-400 text-sm">
                    <svg
                        class="fill-current text-orange-500 w-4"
                        viewBox="0 0 24 24"
                    >
                        <g data-name="Layer 2">
                            <path
                                d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                                data-name="star"
                            />
                        </g>
                    </svg>
                    <span class="ml-1">{{ movie.vote_average }}</span>
                    <span class="mx-2">|</span>
                    <span>
                        {{
                            type == 'movies'
                                ? movie.release_date
                                : movie.first_air_date
                        }}</span
                    >
                    <span class="mx-2">|</span>
                    <span
                        v-for="genres in movie.genres"
                        :key="'genres_' + genres.id"
                        >{{ genres.name }}
                    </span>
                </div>

                <p class="text-gray-300 mt-8">
                    {{ movie.overview }}
                </p>

                <div v-if="movie.videos">
                    <div class="mt-12" v-if="movie.videos.results">
                        <button
                            class="
                                flex
                                inline-flex
                                items-center
                                bg-orange-500
                                text-gray-900
                                rounded
                                font-semibold
                                px-5
                                py-4
                                hover:bg-orange-600
                                transition
                                ease-in-out
                                duration-150
                            "
                        >
                            <svg class="w-6 fill-current" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                />
                            </svg>
                            <span class="ml-2">Play Trailer</span>
                        </button>
                    </div>
                </div>

                <h4 class="font-semibold mt-12">Similar</h4>

                <transition-group
                    appear
                    name="staggered-fade"
                    tag="div"
                    :css="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
                >
                    <div
                        class="mt-4"
                        v-for="(similar, index) in movie.similar"
                        :data-order="index"
                        :key="'similar_' + similar.id"
                    >
                        <router-link
                            :to="{
                                name: 'Details',
                                params: {
                                    type: similar.title ? 'movies' : 'tvs',
                                    id: similar.id,
                                },
                            }"
                            ><img
                                :src="shortImage(similar.poster_path)"
                                alt="poster"
                                class="
                                    hover:opacity-75
                                    transition
                                    ease-in-out
                                    duration-150
                                "
                        /></router-link>
                        <router-link
                            :to="{
                                name: 'Details',
                                params: {
                                    type: similar.title ? 'movies' : 'tvs',
                                    id: similar.id,
                                },
                            }"
                            class="
                                text-sm
                                leading-normal
                                block
                                text-gray-400
                                hover:text-white
                                mt-1
                            "
                            >{{ similar.title ?? similar.name }}
                        </router-link>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
    <!-- end movie-info -->

    <div class="movie-cast border-b border-gray-800" v-if="movie.credits">
        <div class="container mx-auto px-4 py-16">
            <h2 class="text-4xl font-semibold">Cast</h2>
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
                v-if="movie.credits.cast"
            >
                <div
                    class="mt-8"
                    v-for="(cast, index) in movie.credits.cast"
                    :data-order="index"
                    :key="'cast_' + cast.id"
                >
                    <router-link
                        :to="{
                            name: 'Actor',
                            params: {
                                id: cast.id,
                            },
                        }"
                    >
                        <img
                            :src="
                                shortImage(
                                    cast.profile_path ?? movie.poster_path
                                )
                            "
                            alt="actor1"
                            class="
                                hover:opacity-75
                                transition
                                ease-in-out
                                duration-150
                            "
                        />
                    </router-link>
                    <div class="mt-2">
                        <a
                            href="actors.show cast['id'])"
                            class="text-lg mt-2 hover:text-gray:300"
                            >{{ cast.name }}</a
                        >
                        <div class="text-sm text-gray-400">
                            {{ cast.character }}
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
    <div class="movie-cast border-b border-gray-800" v-if="movie.credits">
        <div class="container mx-auto px-4 py-16">
            <h2 class="text-4xl font-semibold">Crew</h2>
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
                v-if="movie.credits.crew"
            >
                <div
                    class="mt-8"
                    v-for="(crew, index) in movie.credits.crew"
                    :data-order="index"
                    :key="'crew_' + crew.id"
                >
                    <router-link
                        :to="{
                            name: 'Actor',
                            params: {
                                id: crew.id,
                            },
                        }"
                    >
                        <img
                            :src="
                                shortImage(
                                    crew.profile_path ?? movie.poster_path
                                )
                            "
                            alt="actor1"
                            class="
                                hover:opacity-75
                                transition
                                ease-in-out
                                duration-150
                            "
                        />
                    </router-link>
                    <div class="mt-2">
                        <a
                            href="actors.show crew['id'])"
                            class="text-lg mt-2 hover:text-gray:300"
                            >{{ crew.name }}</a
                        >
                        <div class="text-sm text-gray-400">
                            {{ crew.department }}
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>

    <div class="movie-images" x-data="{ isOpen: false, image: ''}">
        <div class="container mx-auto px-4 py-16" v-if="movie.images">
            <h2 class="text-4xl font-semibold">Images</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <transition-group
                    appear
                    name="staggered-fade"
                    tag="div"
                    :css="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    class="mt-8"
                    v-for="(image, index) in movie.images.posters"
                    :data-order="index"
                    :key="'image_' + image"
                >
                    <a
                        @click.prevent="isOpen = true"
                        :image="shortImage(image.file_path)"
                    >
                        <img
                            :src="shortImage(image.file_path)"
                            alt="image1"
                            class="
                                hover:opacity-75
                                transition
                                ease-in-out
                                duration-150
                            "
                        />
                    </a>
                </transition-group>
            </div>

            <div
                style="background-color: rgba(0, 0, 0, 0.5)"
                class="
                    fixed
                    top-0
                    left-0
                    w-full
                    h-full
                    flex
                    items-center
                    shadow-lg
                    overflow-y-auto
                "
                v-if="isOpen"
            >
                <div
                    class="
                        container
                        mx-auto
                        lg:px-32
                        rounded-lg
                        overflow-y-auto
                    "
                >
                    <div class="bg-gray-900 rounded">
                        <div class="flex justify-end pr-4 pt-2">
                            <button
                                @click="isOpen = false"
                                @keydown.esc.enter="isOpen = false"
                                class="
                                    text-3xl
                                    leading-none
                                    hover:text-gray-300
                                "
                            >
                                &times;
                            </button>
                        </div>
                        <div class="modal-body px-8 py-8">
                            <img
                                :src="shortImage(movie.backdrop_path)"
                                alt="poster"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import apiConfig from './../services/tmdb/apiConfig';
import annimation from '../services/annimation';
export default {
    setup() {
        const { dispatch, getters } = useStore();
        const route = useRoute();
        const { type, id } = route.params;
        const isOpen = ref(false);
        const originalImage = apiConfig.originalImage;
        const shortImage = apiConfig.w500Image;
        var movie = computed(() => getters[type + '/getSingle']);
        dispatch(type + '/GET_BY_ID', id);
        const beforeEnter = annimation.beforeEnter;
        const enter = annimation.enter;
        return {
            isOpen,
            movie,
            type,
            originalImage,
            shortImage,
            beforeEnter,
            enter,
        };
    },
};
</script>

<style></style>
