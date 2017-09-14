// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import '../Components'
import App from './App.vue'
import AutoScrollTo from '@/directives/autoScroll';

Vue.config.productionTip = false

Vue.directive("scrollTo",AutoScrollTo);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render(h){return  h('App')},
  components: {App}
})
