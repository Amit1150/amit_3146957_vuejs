import CommentService from '../services/comment.service';

import Constants from '../shared/constants';

import { 
    FETCH_COMMENTS,
    COMMENT_ADD,
    COMMENT_DELETE
} from './actions.type';

import { 
    SET_COMMENTS,
    APPEND_COMMENT,
    REMOVE_COMMENT
 } from './mutations.type';

 export default {
     state: {
         comments: []
     },
     mutations: {
        [SET_COMMENTS](state, value) {
            state.comments = value;
        },
        [APPEND_COMMENT](state, value) {
            state.comments.push(value);
        },
        [REMOVE_COMMENT](state, value) {
            const index = state.comments.findIndex(x => x.id == value);
            state.comments.splice(index, 1);
        }
     },
     actions: {
        [FETCH_COMMENTS]({ commit }, params) {
            CommentService.get(Constants.Api.comments, params)
                .then(({data}) => {
                    commit(SET_COMMENTS, data.comments);
                });
        },
        [COMMENT_ADD]({commit}, data) {
            return new Promise((resolve) => {
                CommentService.save(Constants.Api.comments, data)
                .then(({ data }) => {
                    commit(APPEND_COMMENT, data.comment);
                    resolve(data);
                });
            });
        },
        [COMMENT_DELETE]({commit}, data){
            CommentService.remove(Constants.Api.comments, data)
                .then(() => {
                    commit(REMOVE_COMMENT, data.id);
                });
        }
     },
     getters: {
         comments(state) {
             return state.comments;
         }
     }
 }