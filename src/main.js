import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import BootstrapVue from 'bootstrap-vue'
import './assets/scss/style.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHeart, faEdit, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import DateFilter from "./shared/filters/date.filter";
Vue.filter("date", DateFilter);

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
