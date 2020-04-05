import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/basic.scss';
import Vueresource from 'vue-resource';
import VueSocketio from 'vue-socket.io';
import Storage from './model/storage';
import Http from './server/http'

Vue.prototype.$Http = Http

let deskid = location.hash.split("=")[1];
Storage.set("deskid",deskid);

Vue.use(Vueresource);
Vue.use(new VueSocketio({
  debug: true,
  connection: 'http://localhost:3000?deskid='+deskid,
}))

new Vue({
  el: '#app',
  router,
  sockets: {
    connect: function () {
      console.log("连接服务器成功");
    },
  },
  render: h => h(App)
})
