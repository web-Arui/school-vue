import axios from 'axios'
import store from '@/store'
// 处理路由跳转
import router from 'vue-router'

//设置公共的地址
axios.defaults.baseURL = " http://127.0.0.1:4000/api/"
// axios.defaults.baseURL = " http://139.196.72.164:4001/api"
// 请求拦截
axios.interceptors.request.use((config)=>{
  // 设置统一请求头 token操作 loading操作 

  if(store.state.token){
    config.headers.token = store.state.token
  }

  return config 
},err=>{
  return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use((response)=>{
  // 关闭loading操作 对所有响应的数据进行统一操作 response.data
  return response;
},err=>{
  // 处理token过期 清除过期token 跳转路由
  return Promise.reject(err)
  }
)
export default axios;
