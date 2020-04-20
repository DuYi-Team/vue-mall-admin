import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Layout,
    meta: {
      title: '首页'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
