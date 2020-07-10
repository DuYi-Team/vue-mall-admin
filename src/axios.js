import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:3333/',
  baseURL: 'https://mallapi.duyiedu.com/',
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  config.params = {
    ...config.params,
    appkey: 'dongmeqi_1594360481601',
  };
  return config;
}, (error) => Promise.reject(error));
// http response 拦截器
instance.interceptors.response.use(
  (response) => {
    // 拦截响应，做统一处理
    if (response.status !== 200) {
      return response.statusText;
    }
    if (response.data.status !== 'success') {
      return Promise.reject(response.data.msg);
    }
    return response.data.data;
  },
  // 接口错误状态处理，也就是说无响应时的处理
  (error) => Promise.reject(error), // 返回接口返回的错误信息
);
export default instance;
