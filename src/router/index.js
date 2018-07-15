// 引入第三方包
// vue
import Vue from 'vue'
// 路由 vue-router
import Router from 'vue-router'
// 引入login
import Login from '../components/login/login.vue'
// 引入 home
import Home from '../components/home/home.vue'
// 引入 User
import User from '../components/user/user.vue'
// 使用
Vue.use(Router)
// 暴露
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/user',
          name: 'user',
          component: User
        }
      ]
    }
  ]
})
// 全局守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log(next)
  // 判断, 如果访问的是login登录页面 就往下进行
  if (to.path === '/login') {
    next()
  } else { // 如果访问的是别的页面 就需要判断有没有token
    // 获取到token
    const token = window.localStorage.getItem('userInfo')
    // 判断 是否有token 如果有token的话 就往下继续执行
    if (token) {
      next()
    } else {
      // console.log(this)
      // window.location.href = 'http://localhost:8080/#/login'
      next({
        name: 'login'
      })
    }
  }
})
export default router
