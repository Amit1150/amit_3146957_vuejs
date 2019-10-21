import { createLocalVue, mount } from "@vue/test-utils";
import NAGPPagination from "../../../src/components/Pagination.vue";
import BootstrapVue from 'bootstrap-vue'

/* Intial Setup*/
const localVue = createLocalVue();
localVue.use(BootstrapVue);
/* End Setup */

const createWrapper = (data) => {
    return mount(NAGPPagination, {
      propsData: {
        rows: data.rows,
        currentPage: data.currentPage,
        itemPerPage: data.itemPerPage
      },
      localVue
    });
};

describe("NAGPPagination", () => {
    it("Should have active class on firs page item", () => {
        const data = {
            rows: 200,
            currentPage: 1,
            itemPerPage: 20
        };

        const wrapper = createWrapper(data);
        const pageItem = wrapper.find(".page-item.active");
        expect(pageItem.text()).toEqual("1");
    });
});