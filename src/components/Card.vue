<template>
    <div
        @mouseover="showTooltip(movie.id)"
        @mouseleave="hideTooltip(movie.id)"
        class="
            bg-white
            rounded-lg
            shadow-md
            h-mcard
            m-1
            md:h-card
            flex flex-col
            relative
        "
    >
        <div class="flex-1">
            <div class="relative">
                <img
                    class="
                        h-full
                        object-cover object-center
                        rounded-lg
                        swiper-lazy
                    "
                    :src="shortImage(movie.poster_path)"
                    :alt="movie.title"
                />
                <div
                    class="
                        pl-2
                        pb-1
                        text-white
                        w-full
                        absolute
                        bottom-0
                        rounded-lg
                    "
                    style="background: rgba(0, 0, 0, 0.8)"
                >
                    <h2 class="text-xl font-bold">
                        {{ type ? movie.title : movie.name }}
                    </h2>
                    <p class="text-md font-semibold">
                        {{ type ? movie.release_date : movie.first_air_date }}
                    </p>

                    <div class="whitespace-no-wrap">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="star"
                            class="
                                svg-inline--fa
                                fa-star fa-w-18
                                w-4
                                mt-1
                                float-left
                                display-inline
                                align-middle
                            "
                            role="img"
                            viewBox="0 0 576 512"
                        >
                            <path
                                fill="currentColor"
                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                            />
                        </svg>
                        <span class="ml-1">{{ movie.vote_average }}/10 </span>
                    </div>
                </div>
            </div>
        </div>
        <div
            :id="parent + '_' + movie.id"
            class="
                absolute
                inset-0
                z-10
                w-92
                h-card
                p-2
                text-sm
                leading-tight
                text-white
                rounded-lg
                shadow-lg
                hidden
            "
            style="background: rgba(0, 0, 0, 0.9)"
        >
            <img
                class="w-full h-1/3 object-cover object-center rounded-t-lg"
                :src="shortImage(movie.backdrop_path ?? movie.poster_path)"
                alt="Mountain"
            />
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">
                    {{ type ? movie.title : movie.name }}
                </div>
                <p class="text-gray-400 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                </p>
            </div>
            <div class="px-6 pt-2 pb-2">
                <span
                    class="
                        inline-block
                        bg-gray-200
                        rounded-full
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-gray-700
                        mr-2
                        mb-2
                    "
                    >#photography</span
                >
                <span
                    class="
                        inline-block
                        bg-gray-200
                        rounded-full
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-gray-700
                        mr-2
                        mb-2
                    "
                    >#travel</span
                >
                <span
                    class="
                        inline-block
                        bg-gray-200
                        rounded-full
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-gray-700
                        mr-2
                        mb-2
                    "
                    >#winter</span
                >
            </div>
        </div>
    </div>
</template>
<script>
import apiConfig from './../services/tmdb/apiConfig';
export default {
    props: ['movie', 'parent', 'type'],
    setup(props) {
        const shortImage = apiConfig.w500Image;
        function showTooltip(id) {
            document.getElementById(props.parent + '_' + id).style.display =
                'block';
        }
        function hideTooltip(id) {
            document.getElementById(props.parent + '_' + id).style.display =
                'none';
        }
        return { showTooltip, hideTooltip, shortImage };
    },
};
</script>
