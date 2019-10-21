import ApiService from '../services/api.service';
import Constants from '../shared/constants';
import { LOGIN, LOGOUT, REGISTER, SETHEADER } from './actions.type';
import { UPDATE_LOGGEDIN_STATUS, REMOVE_TOKEN, SET_ERROR } from './mutations.type';


export default {
    state: {
        isLoggedIn: false,
        user: {}
    },
    mutations: {
        [UPDATE_LOGGEDIN_STATUS](state, value) {
            state.user = value;
            state.isLoggedIn = true;
            state.errors = {};
        },
        [REMOVE_TOKEN](state) {
            state.isLoggedIn = false;
            state.user = {};
            state.errors = {};
        },
    },
    actions: {
        [LOGIN]({ commit }, login) {
            return new Promise((resolve) => {
                ApiService.post(Constants.Api.login, { user: login})
                    .then(({data}) => {
                        commit(UPDATE_LOGGEDIN_STATUS, data.user);
                        resolve(data);
                    })
                    .catch(({ response }) => {
                        commit(SET_ERROR, response.data.errors, {root : true});
                    });
            });
        },
        [REGISTER]({ commit }, register) {
            return new Promise((resolve, reject) => {
                ApiService.post(Constants.Api.register, { user: register })
                    .then(({data}) => {
                        commit(UPDATE_LOGGEDIN_STATUS, data.user);
                        resolve(data);
                    })
                    .catch((response) => {
                        commit(SET_ERROR, response.data.errors);
                        reject(response);
                    });
            });
        },
        [SETHEADER]({state}){
            if(state.isLoggedIn) {
                ApiService.setHeader(state.user.token);
            }
        },
        [LOGOUT]({ commit }) {
            commit(REMOVE_TOKEN);
        },
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.user;
        }
    }
}