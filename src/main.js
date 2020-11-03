/*
 * @Author: xujintai
 * @Date: 2020-11-02 13:42:33
 * @LastEditors: xujintai
 * @LastEditTime: 2020-11-02 17:13:56
 * @Description: 文件说明
 */
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

//登录请求
import axios from 'axios'
axios.defaults.baseURL = "https://admin.w.ruiztech.cn:4443/ruiz"
Vue.prototype.$http = axios

Vue.config.productionTip = false


Vue.prototype.$bus = new Vue()// 添加事件总线对象



// 解决移动端300ms延迟
fastClick.attach(document.body)

// 使用图片懒加载插件
// Vue.use(VueLazyload, {
//   loading: require("././")
//   loading配置占位图片
// })


// 使用方法
// :src=""改为 v-lazy=""

Vue.use(ElementUI);



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
