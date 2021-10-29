import tmdb, { movie } from '../../services/tmdb';

export default {
    namespaced: true,
    state: () => ({
        popular: [],
        top_rated: [],
    }),

    getters: {
        getPopular: (state) => state.popular,
        gettop: (state) => state.top_rated,
        getSlide: (state) => state.popular.slice(1, 2),
    },

    mutations: {
        SET_POPULAR: (state, paylod) => (state.popular = paylod),
        SET_TOP_RATED: (state, paylod) => (state.top_rated = paylod),
    },

    actions: {
        GET_POPULAR: async ({ commit }, payload) => {
            try {
                const response = await tmdb.getMoviesList(
                    movie.popular,
                    payload
                );
                commit('SET_POPULAR', response.results);
            } catch {
                console.log('error');
            }
        },
        GET_TOP_RATED: async ({ commit }, payload) => {
            try {
                const response = await tmdb.getMoviesList(
                    movie.top_rated,
                    payload
                );
                commit('SET_TOP_RATED', response.results);
            } catch {
                console.log('error');
            }
        },
    },
};
