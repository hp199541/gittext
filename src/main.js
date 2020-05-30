import 'babel-polyfill' // 必须在头部
import './assets/scss/index.scss' // 率先加载的样式
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import bus from './bus'
import './directives'
if (process.env.NODE_ENV === 'development') {
  require('../static/css/images.css')
}

Vue.config.productionTip = false

// install methods
Vue.prototype.$api = api
Vue.prototype.$bus = bus

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
