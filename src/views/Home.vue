<template>
    <div class="container mx-auto px-4 pt-16">
        <Popular type="movies" />
        <Popular type="tvs" />
        <Top type="movies" />
        <Top type="tvs" />
    </div>
</template>

<script>
import Popular from '/src/components/Popular.vue';
import Top from '/src/components/Top.vue';
export default {
    name: 'Home',
    components: {
        Popular,
        Top,
    },
};
</script>
