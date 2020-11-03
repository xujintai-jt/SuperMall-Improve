import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance1 = axios.create({
    baseURL: 'https://admin.w.ruiztech.cn:4443/ruiz',
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


