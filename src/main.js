// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync';
import App from './App'
import store from './vuex'
import router from './router'

import "../flex.js"

Vue.config.productionTip = false

sync(store, router);

Vue.prototype.HOST = "/api";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
