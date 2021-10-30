<template>
    <div>
        <div class="mt-8 relative">
            <router-link
                :to="{
                    name: 'Details',
                    params: { type: type ? 'movies' : 'tvs', id: movie.id },
                }"
            >
                <img
                    class="hover:opacity-75 transition ease-in-out duration-150"
                    :src="
                        shortImage(
                            movie.poster_path ??
                                '6HuPZbS9UyAIFE5t39v9elmfX6d.jpg'
                        )
                    "
                    :alt="movie.title ?? movie.original_title"
                />
            </router-link>
            <div
                @mouseover="showTooltip(movie.id)"
                @mouseleave="hideTooltip(movie.id)"
                class="mt-2"
            >
                <h2 class="text-lg mt-2 hover:text-gray-300">
                    {{
                        type ? movie.title : movie.name ?? movie.original_title
                    }}
                </h2>
                <div
                    :id="parent + '_' + movie.id"
                    class="
                        absolute
                        inset-0
                        w-full
                        h-full
                        bg-gray-800
                        p-4
                        overflow-hidden
                        hidden
                    "
                >
                    {{ movie.overview }}
                </div>
                <div class="flex items-center text-gray-400 text-sm mt-1">
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
                    <span>{{
                        formatDate(movie.release_date ?? movie.first_air_date)
                    }}</span>
                </div>
                <div class="text-gray-400 text-sm">
                    {{ movie.genres }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import annimation from '../services/annimation';
import apiConfig from './../services/tmdb/apiConfig';
export default {
    props: ['movie', 'parent', 'type'],
    setup(props) {
        const shortImage = apiConfig.w500Image;
        const formatDate = annimation.format;
        function showTooltip(id) {
            document.getElementById(props.parent + '_' + id).style.display =
                'block';
        }
        function hideTooltip(id) {
            document.getElementById(props.parent + '_' + id).style.display =
                'none';
        }
        return { showTooltip, hideTooltip, shortImage, formatDate };
    },
};
</script>
