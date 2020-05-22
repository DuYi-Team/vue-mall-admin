import axios from 'axios'
var instance = axios.create({
  baseURL: 'https://mock.duyiedu.com/mock/16/vue-mall-admin'
})

export default instance
