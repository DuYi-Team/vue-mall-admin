import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://139.224.41.93:3000/mock/16/vue-mall-admin'
})
export default {
  // 获取产品列表数据
  getProductsList (params) {
    return instance.get('/products', {
      params
    })
  },
  addProduce (params) {
    return instance.post('/product/add', {
      params
    })
  }
}
