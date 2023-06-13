//统一api管理
import instance from "./axios";
// data json
const userLogin=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data,
      
    })
}
const adminLogin=(data)=>{
   return instance.request({
    url:'', //url=baseURL+url
        method:'post',
        data
   })
}
const adCatePage=(data)=>{
   return instance.request({
    url:'api/paper/page',
    method:'post',
    data
   })
}
const adCateDelId=(params)=>{
    return instance.request({
        url:'api/paper/delete',
        method:'get',
        params
    })
}
const adCateAdd=(data)=>{
    return instance.request({
        url:'api/paper/add',
        method:'post',
        data
    })
}
const adCateEdit=(data)=>{
    return instance.request({
        url:'api/paper/edit',
        method:'post',
        data
    })
}


import axios from 'axios'


// 创建自定义的 Axios 实例
const api = axios.create({
  baseURL: 'https://api.jqrjq.cn', // 设置基础URL
  withCredentials: true, // 允许携带跨域请求的凭证
})

// 添加请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些处理
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)
export {
    userLogin,
    adminLogin,
    adCatePage,
    adCateDelId,
    adCateAdd,
    adCateEdit
} 
// 添加响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理
    return response
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)
export default api