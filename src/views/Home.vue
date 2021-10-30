<template>
    <div class="container mx-auto px-4 pt-16">
        <transition-group
            appear
            name="staggered-fade"
            tag="div"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
        >
            <Popular type="movies" key="popular_movies" :data-order="1" />
            <Popular type="tvs" key="popular_tvs" :data-order="2" />
            <Top type="movies" key="top_movies" :data-order="3" />
            <Top type="tvs" key="top_tvs" :data-order="4" />
        </transition-group>
    </div>
</template>

<script>
import Popular from '/src/components/Popular.vue';
import Top from '/src/components/Top.vue';
import annimation from '../services/annimation';
export default {
    components: {
        Popular,
        Top,
    },
    setup() {
        const beforeEnter = annimation.beforeEnter;
        const enter = annimation.enter;

        return { beforeEnter, enter };
    },
};
</script>
