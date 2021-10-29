<template>
    <div class="home">
        <!-- <Slider /> -->
        <Popular type="movies" />
        <Popular type="tvs" />
        <Top type="movies" />
        <Top type="tvs" />
    </div>
</template>

<script>
import Popular from '/src/components/Popular.vue';
import Top from '/src/components/Top.vue';
import Slider from '/src/components/Slider.vue';
export default {
    name: 'Home',
    components: {
        Popular,
        Top,
        Slider,
    },
};
</script>
