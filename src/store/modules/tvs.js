import tmdb, { tv, category } from '../../services/tmdb';

export default {
    namespaced: true,
    state: () => ({
        popular: [],
        top_rated: [],
        single: {},
    }),

    getters: {
        getPopular: (state) => state.popular,
        gettop: (state) => state.top_rated,
        getSingle: (state) => state.single,
    },

    mutations: {
        UPDATE_POPULAR: (state, paylod) => state.popular.push(...paylod),
        SET_POPULAR: (state, paylod) => (state.popular = paylod),
        SET_TOP_RATED: (state, paylod) => (state.top_rated = paylod),
        SET_SINGLE: (state, paylod) => (state.single = paylod),
    },

    actions: {
        GET_POPULAR: async ({ commit }, payload) => {
            try {
                const response = await tmdb.getTvList(tv.popular, payload);
                if (response.page > 1) {
                    commit('UPDATE_POPULAR', response.results);
                } else {
                    commit('SET_POPULAR', response.results);
                }
            } catch (error) {
                console.log(error);
            }
        },
        SEARCH: async ({ commit }, payload) => {
            try {
                const response = await tmdb.search(category.movie, payload);
                if (response.page > 1) {
                    commit('UPDATE_POPULAR', response.results);
                } else {
                    commit('SET_POPULAR', response.results);
                }
            } catch (error) {
                console.log(error);
            }
        },
        GET_TOP_RATED: async ({ commit }, payload) => {
            try {
                const response = await tmdb.getTvList(tv.top_rated, payload);
                commit('SET_TOP_RATED', response.results);
            } catch (error) {
                console.log(error);
            }
        },
        GET_BY_ID: async ({ commit }, id) => {
            try {
                const response = await tmdb.details(category.tv, id, {
                    append_to_response: 'credits,videos,images',
                });
                const similar = await tmdb.similar(category.tv, id);
                const data = {
                    ...response,
                    similar: similar.results
                        .sort(function (a, b) {
                            return b.popularity - a.popularity;
                        })
                        .slice(0, 5),
                };
                commit('SET_SINGLE', data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
