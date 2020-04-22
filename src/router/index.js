import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index.vue'
import GoodsList from '../views/goods/list.vue'
import Home from '../views/home/index.vue'
Vue.use(VueRouter)

export const routes = [
  {
    path: '',
    component: Layout,
    redirect: {
      path: '/home'
    },
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'desktop'
        }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    meta: {
      title: '商品',
      icon: 'inbox'
    },
    children: [{
      path: 'list',
      name: 'goodsList',
      meta: {
        title: '商品列表',
        icon: 'desktop'
      },
      component: GoodsList
    }]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
