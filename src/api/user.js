import instance from '@/axios';

export default {
  getUserMenu(role) {
    return Math.random() > 0.5 ? {
      roles: ['test'],
      username: role,
      menus: [
        {
          title: '商品',
          name: 'goods',
          icon: 'inbox',
          hidden: 0,
        },
        {
          title: '商品列表',
          name: 'goodsList',
          icon: 'unordered-list',
          hidden: 0,
        },
        {
          title: '添加商品',
          name: 'goodsAdd',
          icon: 'file-add',
          hidden: 0,
        }, {
          title: '编辑商品',
          name: 'goodsEdit',
          icon: 'file-edit',
          hidden: 1,
        },
      ],
    } : {
      roles: ['test'],
      username: role,
      menus: [
        {
          title: '商品',
          level: 0,
          name: 'goods',
          icon: 'inbox',
          hidden: 0,
        },
        {
          title: '商品列表',
          name: 'goodsList',
          icon: 'unordered-list',
          hidden: 0,
        },
        {
          title: '添加商品',
          name: 'goodsAdd',
          icon: 'file-add',
          hidden: 0,
        }, {
          title: '商品类目管理',
          name: 'goodsCategory',
          icon: 'category',
          hidden: 0,
        }, {
          title: '编辑商品',
          name: 'goodsEdit',
          icon: 'file-edit',
          hidden: 1,
        },
      ],
    };
  },
  login(params) {
    return instance.post('/passport/login', params);
  },
};
