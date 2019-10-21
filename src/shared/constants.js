import Config from '../config';

export default {
  Api: {
    login: `${Config.API_BASE_URL}/users/login`,
    register: `${Config.API_BASE_URL}/users`,
    articles: `${Config.API_BASE_URL}/articles`,
    tags: `${Config.API_BASE_URL}/tags`,
    comments: `${Config.API_BASE_URL}/articles/{slug}/comments`,
    favorite: `${Config.API_BASE_URL}/articles/{slug}/favorite`
  },
  DateFormat : 'MMMM D, YYYY'
};
