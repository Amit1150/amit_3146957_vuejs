import ApiService from '../services/api.service';
import Constants from '../shared/constants';

export default {
    save(data) {
        data.tagList = data.tags.split(',');
        return ApiService.post(Constants.Api.articles, { article: data });
    },
    updateArticle(data) {
        const url = `${Constants.Api.articles}/${data.slug}`;
        data.tagList = data.tags.split(',');
        return ApiService.put(url, { article: data });
    },
    deleteArticle(params) {
        const url = `${Constants.Api.articles}/${params}`;
        return ApiService.delete(url);
    },
    getArticle(params) {
        const url = `${Constants.Api.articles}/${params}`;
        return ApiService.get(url);
    },
    addFavorite(slug) {
       const url = Constants.Api.favorite.replace('{slug}', slug);
       return ApiService.post(url);
    },
    removeFavorite(slug) {
        const url = Constants.Api.favorite.replace('{slug}', slug);
        return ApiService.delete(url);
    }
}