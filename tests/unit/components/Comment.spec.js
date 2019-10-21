import { createLocalVue, mount } from '@vue/test-utils'
import casual  from 'casual';
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import store from '@/store'

import NAGPComment from "../../../src/components/Comment.vue";
import DateFilter from "../../../src/shared/filters/date.filter";

/* Intial Setup*/
const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);
localVue.filter("date", DateFilter);
/* End Setup */


const createWrapper = (comment) => {
    return mount(NAGPComment, {
      propsData: {
        comment: comment
      },
      localVue,
      store
    });
};


describe("NAGPComment", () => {
    it("Should render all comments", () => {
        const totalComments = 1;
        const comment = generateData();
        const wrapper = createWrapper(comment);
        const commentContainer = wrapper.findAll(".comment-container");
        expect(commentContainer.length).toEqual(totalComments);
    });
});

describe("NAGPComment", () => {
    it("Should render correct comment body", () => {
        const comment = generateData();
        const wrapper = createWrapper(comment);
        const commentBody = wrapper.find(".comment-body");
        expect(commentBody.text()).toMatch(comment.body);
    });
});



const generateData = () => {
    return {
        id: casual.building_number,
        updatedAt: casual.moment,
        body: casual.description,
        author: {
            username: casual.username
        }
    }
}