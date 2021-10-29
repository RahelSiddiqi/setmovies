import { createStore } from 'vuex';
import movies from '../store/modules/movies';
import tvs from '../store/modules/tvs';

const store = createStore({
    modules: {
        movies,
        tvs,
    },
});

export default store;
