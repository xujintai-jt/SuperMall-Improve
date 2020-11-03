import axios from 'axios'
// 封装axios模块
export function request(config) {
  // 创建axios实例
  const instance1 = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // axios拦截器
  // 1、请求拦截：拦截config信息 
  instance1.interceptors.request.use(config => {
    return config
  },
    err => {
      console.log(err);
    })

  // 2、响应拦截
  instance1.interceptors.response.use(result => {
    return result.data
  }, err => {
    console.log(err);
  })

  // 发送真正的网络请求
  return instance1(config)
}




