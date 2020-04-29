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
    name: 'index',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
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
    name: 'goods',
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
    }, {
      path: 'add',
      name: 'goodsAdd',
      meta: {
        title: '新增商品',
        icon: 'desktop'
      },
      component: () => import('@/views/goods/add.vue')
    }, {
      path: 'tags',
      name: 'goodsTags',
      meta: {
        title: '标签管理',
        icon: 'desktop'
      },
      component: () => import('@/views/goods/tags.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
