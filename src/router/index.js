// 引入第三方包
// vue
import Vue from 'vue'
// 路由 vue-router
import Router from 'vue-router'
// 引入login
import Login from '../components/login/login.vue'
// 引入 home
import Home from '../components/home/home.vue'
// 使用
Vue.use(Router)
// 暴露
const router = new Router({
  routes: [
    {path: '/login', component: Login},
    {path: '/home', component: Home}
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(next)
  if (to.path === '/login') {
    next()
  } else {
    // const token = window.localStorage.getItem('userInfo')
    // if () {
    // }
  }
})
export default router
