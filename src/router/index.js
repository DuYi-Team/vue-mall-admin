import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/login/index.vue';
import Layout from '../views/layout/index.vue';
import GoodsList from '../views/goods/list.vue';
import Home from '../views/home/index.vue';

Vue.use(VueRouter);
export const commonRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: {
      path: '/home',
    },
    name: 'index',
    meta: {
      title: '首页',
      icon: 'home',
      isPage: false,
    },
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        meta: {
          title: '统计',
          icon: 'home',
          isPage: true,
        },
      },
    ],
  },
];
export const asyncRouterMap = [
  {
    path: '/goods',
    component: Layout,
    name: 'goods',
    meta: {
      title: '商品',
      icon: 'inbox',
      isPage: false,
    },
    children: [{
      path: 'list',
      name: 'goodsList',
      meta: {
        title: '商品列表',
        icon: 'unordered-list',
        isPage: true,
      },
      component: GoodsList,
    }, {
      path: 'add',
      name: 'goodsAdd',
      meta: {
        title: '新增商品',
        icon: 'file-add',
        isPage: true,
      },
      component: () => import('@/views/goods/add.vue'),
    }, {
      path: 'category',
      name: 'goodsCategory',
      meta: {
        title: '商品类别管理',
        icon: 'category',
        isPage: false,
      },
      component: () => import('@/views/goods/category.vue'),
    }, {
      path: 'edit/:id',
      name: 'goodsEdit',
      meta: {
        title: '编辑商品',
        icon: 'file-edit',
        isPage: true,
      },
      component: () => import('@/views/goods/add.vue'),
    }],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: commonRouterMap,
});

export default router;
