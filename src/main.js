// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
import './assets/material-Icons/material-icons.css'
import './assets/ronoto-font/Roboto.css'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

//import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

import './UIComponents';
