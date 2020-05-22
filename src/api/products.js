import instance from '@/axios'

export default {
  // 获取产品列表数据
  getProductsList (params) {
    return instance.get('/products', {
      params
    })
  },
  addProduce (params) {
    return instance.post('/product/add', params)
  },
  getProductDetail (params) {
    const { id } = { params }
    return instance.get('/products/' + id)
  },
  editProduct (params) {
    return instance.put('/product/edit', params)
  }
}
