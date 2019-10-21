import ApiService from '../services/api.service';

export default {
    get(url, params) {
        url = url.replace('{slug}', params);
        return ApiService.get(url);
    },
    save(url, data) {
        url = url.replace('{slug}', data.slug);
        return ApiService.post(url, { comment : data });
    },
    remove(url, data) {
        url = url.replace('{slug}', data.slug);
        url = `${url}/${data.id}`;
        return ApiService.delete(url);
    }
}