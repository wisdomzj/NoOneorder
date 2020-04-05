import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import http from '@/utils/http'
import '@/icons' // icon
import '@/permission' // permission control
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$request = http

Vue.filter('formatDate', (dateStr, pattern = '') => {
  const dt = new Date(dateStr)
  const y = dt.getFullYear()
  const mon = (dt.getMonth() + 1).toString().padStart(2, '0')
  const d = dt
    .getDate()
    .toString()
    .padStart(2, '0')
  const h = dt.getHours()
  const min = dt
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const s = dt
    .getSeconds()
    .toString()
    .padStart(2, '0')

  if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${mon}-${d}`
  } else {
    return `${y}-${mon}-${d} ${h}:${min}:${s}`
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
