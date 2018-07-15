// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue
import Vue from 'vue'
// 引入根组件
import App from './App'
// 引入路由
import router from './router'
// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
// 获取到token
const token = window.localStorage.getItem('userInfo')
// 自定义实例默认值
var instance = axios.create({
  // axios发送请求时 配置url
  baseURL: 'http://localhost:8888/api/private/v1'
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // config 就是每一次请求的信息
  // console.log(config)
  // 在发送请求之前做些什么
  if (config.url.indexOf('login') === -1) {
    // 证明是没有 login 的请求,那么必须要挂载请求头信息
    // 配置请求头
    config.headers.Authorization = token
    return config
  } else {
    // login 在做登录的请求
    return config
  }
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 将axios的实例放在vue的原型上
Vue.prototype.$axios = instance
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false
// 使用element-ui
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
