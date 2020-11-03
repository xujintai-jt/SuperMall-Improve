/*
 * @Author: xujintai
 * @Date: 2020-11-02 13:42:33
 * @LastEditors: xujintai
 * @LastEditTime: 2020-11-02 13:57:52
 * @Description: 文件说明
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 1、安装插件
Vue.use(VueRouter)

// 在vue项目中点击两次路由切换
// 原因：
// 多次点击跳转同一个路由是不被允许的
// 解决方案（两种）：
// 1.降低版本：切换版本回3.0版本
// 2.重写规则：在你引了vue-router的js文件里加上如下代码即可（我的在index.js文件）
//push ()
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

const Cart = () => import('views/cart/Cart')
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Login = () => import('components/common/login/Login')

// import Home from '@/views/home/Home'
// import Profile from '@/views/profile/Profile'
// import Category from '@/views/category/Category'
// import Cart from '@/views/cart/Cart'
// import Detail from '@/views/detail/Detail'

// 2、创建router
const routes = [
  {
    path: '/',
    redirect: '/Home/'
  }
  , {
    name: 'Home',
    path: '/Home/',
    component: Home
  },
  {
    name: 'Category',
    path: '/Category/',
    component: Category
  },
  {
    name: 'Profile',
    path: '/Profile/',
    component: Profile
  },
  {
    name: 'Cart',
    path: '/Cart/',
    component: Cart
  }, {
    name: 'Detail',
    path: '/Detail/:iid',
    component: Detail
  },
  // 登录页面
  {
    name: 'Login',
    path: '/Login/',
    component: Login
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//挂载导航守卫
router.beforeEach((to, from, next) => {
  //登录页面，直接放行
  if (to.path === '/Login/')
    return next()
  //获取sessionStorage中token的值
  const tokenStr = window.sessionStorage.getItem('token')
  //没有token,强制跳转到登录页
  if (!tokenStr)
    return next('/Login/')
  //有token 直接放行
  next()
})

export default router