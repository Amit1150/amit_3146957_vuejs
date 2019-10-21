import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import { 
  UPDATE_LOADING_COUNT,
  REMOVE_TOKEN,
  UPDATE_LOGGEDIN_STATUS,
  SET_ERROR,
  RESET_ERROR
} from './mutations.type';

import {
  REMOVE_ERRRORS
} from './actions.type'
import account from './account.module';
import tag from './tag.module';
import article from './article.module';
import comment from './comment.module';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'userToken',
  reducer: (state) => ({ account: state.account }),
  filter: (mutation) => mutation.type == REMOVE_TOKEN || mutation.type == UPDATE_LOGGEDIN_STATUS
});

export default new Vuex.Store({
  state: {
    loadingCount: 0,
    errors: {}
  },
  mutations: {
    [UPDATE_LOADING_COUNT](state, value) {
      state.loadingCount = state.loadingCount + value;
    },
    [SET_ERROR](state, value) {
      state.errors = value;
    },
    [RESET_ERROR](state, value) {
      state.errors = value;
    },
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION
  },
  actions: {
    [REMOVE_ERRRORS]({commit}, value) {
      commit(RESET_ERROR, value);
    }
  },
  modules: {
    account,
    tag,
    article,
    comment
  },
  getters: {
    isLoading(state) {
      return state.loadingCount > 0;
    },
    errors(state) {
      return state.errors;
    }
  },
  plugins: [vuexLocal.plugin]
});
