import ApiService from '../services/api.service';
import Constants from '../shared/constants';
import ArticleService from '../services/article.service';

import { 
    FETCH_ARTICLE,
    ARTICLE_DELETE,
    FETCH_ARTICLES,
    ARTICLE_ADD,
    ARTICLE_EDIT,
    FAVORITE_ADD,
    FAVORITE_DELETE
} from './actions.type';
import { 
    SET_ARTICLES, 
    SET_ARTICLE, 
    SET_ARTICLES_COUNT,
    UPDATE_FAVORITE_ARTICLE } from './mutations.type';


export default {
    state: {
        articles: [],
        article: null,
        articlesCount: 0
    },
    mutations: {
        [SET_ARTICLES](state, value) {
            state.articles = value
        },
        [SET_ARTICLE](state, value) {
            state.article = value
        },
        [SET_ARTICLES_COUNT](state, value) {
            state.articlesCount = value;
        },
        [UPDATE_FAVORITE_ARTICLE](state, value) {
            state.articles = state.articles.map(x => {
                if(x.slug !== value.slug) {
                    return x;
                }
                x.favorited = value.favorited;
                x.favoritesCount = value.favoritesCount;
                return x;
            });
        }
    },
    actions: {
        [ARTICLE_ADD](context, data) {
            return ArticleService.save(data)
        },
        [FETCH_ARTICLES]({ commit }, params) {
            ApiService.get(Constants.Api.articles, params)
                .then(({data}) => {
                    commit(SET_ARTICLES, data.articles);
                    commit(SET_ARTICLES_COUNT, data.articlesCount);
                    
                });
        },
        [FETCH_ARTICLE]({ commit }, params) {
            ArticleService.getArticle(params)
                .then(({data}) => {
                    data.article.tags = data.article.tagList.join();
                    commit(SET_ARTICLE, data.article);
                });
        },
        [ARTICLE_DELETE](context, params) {
            return ArticleService.deleteArticle(params);
        },
        [ARTICLE_EDIT](context, data) {
            return ArticleService.updateArticle(data);
        },
        [FAVORITE_ADD]({ commit }, params) {
            ArticleService.addFavorite(params)
                .then(({data}) => {
                    commit(SET_ARTICLE, data.article);
                    commit(UPDATE_FAVORITE_ARTICLE, data.article);
                });
        },
        [FAVORITE_DELETE]({commit}, params) {
            ArticleService.removeFavorite(params)
                .then(({data}) => {
                    commit(SET_ARTICLE, data.article);
                    commit(UPDATE_FAVORITE_ARTICLE, data.article);
                });
        }
    },
    getters: {
        articles(state) {
            return state.articles;
        },
        articlesCount(state) {
            return state.articlesCount;
        },
        article(state) {
            return state.article;
        }
    }
}
