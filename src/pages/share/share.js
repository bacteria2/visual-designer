/**
 * Created by lenovo on 2017/7/18.
 */
import Vue from 'vue'
import App from '@/views/Share/sharePage.vue'

Vue.config.productionTip = false

import './ResigtryContainer'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  components: { App }
})
