import axios from 'axios'
var instance = axios.create({
  baseURL: 'https://mock.duyiedu.com/mock/16/vue-mall-admin'
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
