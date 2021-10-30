import tmdb, { category, preson } from '../../services/tmdb';
export default {
    namespaced: true,
    state: () => ({
        popular: [],
        actor: {},
    }),

    getters: {
        getActor: (state) => state.actor,
        getPopular: (state) => state.popular,
    },

    mutations: {
        SET_ACTOR: (state, payload) => (state.actor = payload),
        UPDATE_POPULAR: (state, paylod) => state.popular.push(...paylod),
        SET_POPULAR: (state, paylod) => (state.popular = paylod),
    },

    actions: {
        GET_POPULAR: async ({ commit }, payload) => {
            try {
                const response = await tmdb.getActorsList(
                    preson.popular,
                    payload
                );
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
                const response = await tmdb.search(category.person, payload);
                if (response.page > 1) {
                    commit('UPDATE_POPULAR', response.results);
                } else {
                    commit('SET_POPULAR', response.results);
                }
            } catch (error) {
                console.log(error);
            }
        },
        GET_ACTOR: async ({ commit }, id) => {
            try {
                const response = await tmdb.actor(category.person, id);
                const social = await tmdb.actorSocial(category.person, id);
                const credits = await tmdb.combineCredits(category.person, id);
                const known_for = credits.cast
                    .sort(function (a, b) {
                        return b.popularity - a.popularity;
                    })
                    .slice(0, 5);
                const actor = {
                    ...response,
                    social: social,
                    credits: credits,
                    known_for: known_for,
                };

                commit('SET_ACTOR', actor);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
