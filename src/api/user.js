
export default {
  getUserMenu (role) {
    return {
      roles: ['test'],
      username: role,
      menus: [
        {
          id: 1,
          parentId: 0,
          title: '商品',
          level: 0,
          name: 'goods',
          icon: 'inbox',
          hidden: 0
        },
        {
          id: 2,
          parentId: 1,
          title: '商品列表',
          level: 1,
          name: 'goodsList',
          icon: 'unordered-list',
          hidden: 0
        },
        {
          id: 3,
          parentId: 1,
          title: '添加商品',
          level: 1,
          name: 'goodsAdd',
          icon: 'file-add',
          hidden: 0
        }, {
          id: 4,
          parentId: 1,
          title: '标签管理',
          level: 1,
          name: 'goodsTags',
          icon: 'tags',
          hidden: 0
        }
      ]
    }
  }
}
