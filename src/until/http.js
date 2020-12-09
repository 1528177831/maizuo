import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: '',
  timeout: 100000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606890049759706700218369"}'
  }
})

// axios拦截器
// 请求
// axios.interceptors.request()
// 响应
// axios.interceptors.response()
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  // loading
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    overlay: true,
    duration: 0,
    loadingType: 'spinner'
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  Toast.clear()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default http
