<template>all page</template>

<script>
import {  useRoute } from 'vue-router';

import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
    setup() {
        const { dispatch, getters } = useStore();
        const route = useRoute();
        const type = route.params;
        var list = [];
        var page = 1;
        switch (type) {
            case 'movies':
              list = computed(() => getters['tvs/getPopular']);
              if (page > 1) {
                
              }
                break;

            case 'tvs':
                break;
        }
        console.log();
    },
};
</script>

<style></style>
