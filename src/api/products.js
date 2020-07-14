import instance from '@/axios';

export default {
  // 获取产品列表数据
  getProductsList(params) {
    return instance.get('/products/all', {
      params,
    });
  },
  addProduce(params) {
    return instance.post('/products/add', params);
  },
  getProductDetail(id) {
    return instance.get(`/products/${id}`);
  },
  editProduct(params) {
    return instance.put('/products/edit', params);
  },
  removeProduct(params) {
    const { id } = params;
    return instance.delete(`/products/${id}`);
  },
  uploadImages(params) {
    return instance.post('/upload/images', params);
  },
};
