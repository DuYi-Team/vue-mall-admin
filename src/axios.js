import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://mallapi.duyiedu.com:3333/'
})

export default instance
