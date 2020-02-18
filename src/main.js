// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import $ from 'jquery'
// import router from './router'
import bootstrap from './bootstrap'
import store from 'store/index'
import pubilc from './assets/js/component.js'


/**
 * Vue对象新增 axios 原型
 */
Vue.prototype.$http = axios
Vue.prototype.$post = pubilc.post


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  store,
  $,
  template: '<App/>',
  components: { App }
})
