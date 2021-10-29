import tmdb, { tv } from '../../services/tmdb';

export default {
    namespaced: true,
    state: () => ({
        popular: [],
        top_rated: [],
    }),

    getters: {
        getPopular: (state) => state.popular,
        gettop: (state) => state.top_rated,
    },

    mutations: {
        SET_POPULAR: (state, paylod) => (state.popular = paylod),
        SET_TOP_RATED: (state, paylod) => (state.top_rated = paylod),
    },

    actions: {
        GET_POPULAR: async ({ commit }, payload) => {
            try {
                const response = await tmdb.getTvList(tv.popular, payload);
                commit('SET_POPULAR', response.results);
            } catch {
                console.log('error');
            }
        },
        GET_TOP_RATED: async ({ commit }, payload) => {
            try {
                const response = await tmdb.getTvList(tv.top_rated, payload);
                commit('SET_TOP_RATED', response.results);
            } catch {
                console.log('error');
            }
        },
    },
};
