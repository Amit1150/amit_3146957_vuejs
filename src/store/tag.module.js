import ApiService from '../services/api.service';
import Constants from '../shared/constants';
import { FETCH_TAGS } from './actions.type';
import { SET_TAGS } from './mutations.type';

export default {
    state: {
        tags: []
    },
    mutations: {
        [SET_TAGS](state, value) {
            state.tags = value;
        }
    },
    actions: {
        [FETCH_TAGS]({ commit }) {
            ApiService.get(Constants.Api.tags)
                .then(({ data }) => {
                    commit(SET_TAGS, data.tags);
                });
        }
    },
    getters: {
        tags(state) {
            return state.tags;
        }
    }
}