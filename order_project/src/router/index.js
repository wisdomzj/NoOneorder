import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../components/start.vue'
import Home from '../components/home.vue'
import Product from '../components/product.vue'
import Cart from '../components/cart.vue'
import Info from '../components/editInfo.vue'
import Order from '../components/order.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/start', component: Start },
  { path: '/home', component: Home },
  { path: '/product/:pid', component: Product },
  { path: '/info', component: Info },
  { path: '/cart', component: Cart},
  { path: '/order', component: Order}, 
  { path: '*', redirect: '/start' }
]

const router = new VueRouter({
  routes 
})

export default router

