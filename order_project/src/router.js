import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from './components/Start.vue';
import Home from './components/Home.vue';
import Hot from './components/Hot.vue';
import Order from './components/Order.vue';
import Pcontent from './components/Pcontent.vue';
import Search from './components/Search.vue';
import Cart from './components/Cart.vue';
import Editinfo from './components/editinfo.vue';

Vue.use(VueRouter)

// 定义路由
const routes = [
  { path: '/start', component: Start },
  { path: '/home', component: Home },
  { path: '/hot', component: Hot },
  { path: '/order', component: Order },
  { path: '/pcontent/:pid', component: Pcontent },
  { path: '/search', component: Search },
  { path: '/cart', component: Cart },
  { path: '/editinfo', component: Editinfo },
  { path: '*', redirect: '/start' }
]

// 实例化
const router = new VueRouter({
  routes 
})

export default router;

