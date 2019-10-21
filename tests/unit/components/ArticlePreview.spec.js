import { createLocalVue, mount } from '@vue/test-utils'
import casual  from 'casual';
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import store from '@/store'
import router from "../../../src/router/index";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHeart, faEdit, faTrash)

import NAGPArticle from "../../../src/components/ArticlePreview.vue";
import DateFilter from "../../../src/shared/filters/date.filter";

/* Intial Setup */
const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);
localVue.filter("date", DateFilter);
localVue.component('font-awesome-icon', FontAwesomeIcon)
/* End Setup */

const createWrapper = (data) => {
    return mount(NAGPArticle, {
      propsData: {
        article: data
      },
      localVue,
      store,
      router
    });
};


describe("NAGPArticle", () => {
    it("Should show correct title", () => {
        const data = generateData();
        const wrapper = createWrapper(data);
        const articleTitle = wrapper.find(".article-title");
        expect(articleTitle.text()).toMatch(data.title);
    });
});

describe("NAGPArticle", () => {
    it("Should show correct favorite count", () => {
        const data = generateData();
        const wrapper = createWrapper(data);
        const favCount = wrapper.find(".fav-count");
        expect(favCount.text()).toMatch(data.favoritesCount);
    });
});

describe("NAGPArticle", () => {
    it("Should generating correct the route for read more", () => {
        const data = generateData();
        const wrapper = createWrapper(data);
        var readmore = wrapper.find("a.art-read-more");
        expect(readmore.attributes().href).toMatch(`#/article/${data.slug}`);
    });
});


const generateData = () => {
    return {
        updatedAt: casual.moment,
        body: casual.short_description,
        description: casual.description,
        slug: casual.word,
        favorited: casual.boolean,
        favoritesCount: casual.month_number,
        title: casual.title,
        author: {
            username: casual.username
        }
    }
}