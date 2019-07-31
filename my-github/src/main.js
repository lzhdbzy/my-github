// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios' 
import Vuex from 'vuex' 
Vue.use(VueAxios, axios)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(router)
axios.defaults.baseURL = 'http://192.168.1.188:12';

import store from "./assets/js/stroe"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
