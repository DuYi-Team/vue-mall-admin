import instance from '@/axios'
export default {
  // 获取产品列表数据
  getTagsList (params) {
    return instance.get('/tags/all', {
      params
    })
  },
  addTag (params) {
    return instance.post('/tags/add', params)
  },
  editTag (params) {
    return instance.put('/tags/edit', params)
  },
  deleteTag (params) {
    const { id } = params
    return instance.delete('/tags/' + id)
  }
}
