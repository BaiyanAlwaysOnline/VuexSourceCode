import Vue from 'vue'
// ! vuex dev
// import App from './App.vue'
// import store from './store';
// ! vue-router dev
import router from './router.js';
import Root from './Root.vue'
Vue.config.productionTip = false
Vue.config.devtools = false;


new Vue({
  // store,
  router,
  render: h => h(Root),
}).$mount('#app')
