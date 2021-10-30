import axiosClient from './axiosClient';

export const category = {
    movie: 'movie',
    tv: 'tv',
    person: 'person',
};

export const preson = {
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming',
};
export const movie = {
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming',
};

export const tv = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
};

const tmdb = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movie[type];
        return axiosClient.get(url, { params: params });
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tv[type];
        return axiosClient.get(url, { params: params });
    },
    getActorsList: (type, params) => {
        const url = 'person/' + preson[type];
        return axiosClient.get(url, { params: params });
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, { params: params });
    },
    details: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, { params: params });
    },
    actor: (cate, id) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, { params: {} });
    },
    actorSocial: (cate, id) => {
        const url = category[cate] + '/' + id + '/external_ids';
        return axiosClient.get(url, { params: {} });
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, { params: {} });
    },
    combineCredits: (cate, id) => {
        const url = category[cate] + '/' + id + '/combined_credits';
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    },
};

export default tmdb;
