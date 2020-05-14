import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://139.224.41.93:3000/mock/16/vue-mall-admin'
})
export default {
  // 获取产品列表数据
  getTagsList (params) {
    return instance.get('/tags', {
      params
    })
  },
  addTag (params) {
    return instance.post('/tags/add', {
      params
    })
  },
  editTag (params) {
    return instance.put('/tags/edit', {
      params
    })
  }
}
