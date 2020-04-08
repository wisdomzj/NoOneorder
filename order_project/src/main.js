import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from '@/utils/http'
import './assets/css/basic.scss'

Vue.prototype.$request = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
