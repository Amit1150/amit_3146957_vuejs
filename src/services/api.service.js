import axios from 'axios';
import store from '../store/index';
import { UPDATE_LOADING_COUNT, SET_ERROR } from '../store/mutations.type';

const api = axios.create({
    withCredentials: true,
});

api.interceptors.request.use(function (config) {
    store.commit(UPDATE_LOADING_COUNT, 1, { root: true });
    return config;
});

api.interceptors.response.use(function (config) {
    store.commit(UPDATE_LOADING_COUNT, -1, { root: true });
    return config;
}, function(error) {
    store.commit(UPDATE_LOADING_COUNT, -1, { root: true });
    var errorData = error.response.data;
    if(errorData && errorData.errors) {
        store.commit(SET_ERROR, errorData.errors, { root: true });
    }
    return Promise.reject(error);
});

const ApiService = {
    setHeader(token) {
        api.defaults.headers.common.Authorization = `Token ${token}`;
    },
    get(url, data) {
        let queryString = {};
        if(data) {
            queryString.params = data;
        }
        return api.get(url, queryString);
    },
    post(url, data) {
        return api.post(url, data);
    },
    put(url, data) {
        return api.put(url, data);
    },
    delete(url) {
        return api.delete(url);
    }
};

export default ApiService