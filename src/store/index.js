import Vue from "vue"
import Vuex from "vuex"


// 1、安装插件
Vue.use(Vuex)

// 2、创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      //数组find()方法
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.cartList.find(function (item) {
          return item.iid === payload.iid
        })
        if (oldProduct) {
          oldProduct.count += 1;
          resolve('成功将购物车商品数量加1')
        } else {
          payload.count = 1;
          payload.checked = true;
          // state.cartList.push(payload)
          context.commit('addToCart', payload)
          resolve('成功将商品加入购物车')
        }
      })

    }
  }
  ,
  getters: {
    cartListLength(state) {
      return state.cartList.length
    },
    cartListAddCount(state) {
      return state.cartList.reduce((total, item) => {
        return total + item.count
      }, 0)
    },
    cartListAddPrice(state) {
      return state.cartList.reduce((total, item) => {
        return total + item.count * item.price
      }, 0)
    },
  }
})

// 3、导出store,挂载到vue上
export default store