<template>
  <div>
    <div class="cart-list-main flex" v-for="(item,index) in cartList" :key="item.iid">
      <div class="cart-list-left flex">
        <input type="checkbox" class="check" v-model="item.checked" />
        <img :src="item.image" alt class="goods-img" />
      </div>
      <div class="cart-list-right">
        <div class="goods-name one-txt-cut">{{item.title}}</div>
        <div class="goods-info flex">
          <span class="price">￥{{item.price}}</span>
          <button @click="decrease(item)">-</button>
          <!-- <span>x{{item.count}}</span> -->
          <input
            class="input"
            type="text"
            v-model="item.count"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <button @click="increase(item)">+</button>
          <button @click="deleted(index)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    decrease(item) {
      if (item.count >= 2) {
        item.count--;
      }
    },
    increase(item) {
      item.count++;
    },
    deleted(index) {
      this.cartList.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped="scoped">
.cart-list-main {
  padding: 10px;
  border-bottom: 1px solid #ececec;
}
.cart-list-left {
  width: 26%;
  align-items: center;
  .check {
    width: 20px;
    height: 20px;
    overflow: hidden;
    border-radius: 100%;
    border: 1px solid #ececec;
  }
  .check:checked {
    background: url(~assets/img/detail/check_active.png) no-repeat center;
    background-size: cover;
  }
  .goods-img {
    width: 52px;
    height: 66px;
    overflow: hidden;
    border: 1px solid #ececec;
    margin: 0 10px;
    border-radius: 6px;
    vertical-align: middle;
  }
}
.cart-list-right {
  width: 74%;
  position: relative;
  .goods-name {
    width: 100%;
    font-size: 13px;
  }
  .goods-info {
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .price {
      color: #f9cd0b;
    }
    .input {
      text-align: center;
      width: 45px;
    }
  }
}
</style>
