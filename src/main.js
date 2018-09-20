import '@babel/polyfill' // 兼容
import Vue from 'vue'
// 插件
import './plugins/vuetify'
import './plugins/mixins'
import router from './router'
import store from './store/'
// style
import './assets/iconfont/iconfont.css'
import './assets/stylus/main.styl'

// axios mock
import './api/mock'
import axios from 'axios'
Vue.prototype.$http = window.axios = axios

// directive
import directive from './supply/directive'
Vue.use(directive)
// assembly
import assembly from './supply/assembly'
Vue.use(assembly)
// free
import Free from './supply/free'
Vue.prototype.Free = window.Free = Free

// util
window.warn = Vue.util.warn

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h('router-view')
}).$mount('#app')




