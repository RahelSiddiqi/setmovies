import { createStore } from 'vuex';
import movies from '../store/modules/movies';
import actors from '../store/modules/actors';
import tvs from '../store/modules/tvs';

const store = createStore({
    modules: {
        movies,
        tvs,
        actors,
    },
});

export default store;
