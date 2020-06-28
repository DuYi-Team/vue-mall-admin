import instance from '@/axios';

export default {
  // 获取产品列表数据
  getCategoryList(params) {
    return instance.get('/category/all', {
      params,
    });
  },
  addCategory(params) {
    return instance.post('/category/add', params);
  },
  editCategory(params) {
    return instance.put('/category/edit', params);
  },
  deleteCategory(params) {
    const { id } = params;
    return instance.delete(`/category/${id}`);
  },
};
