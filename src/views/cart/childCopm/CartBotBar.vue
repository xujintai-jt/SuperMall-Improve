<template>
  <div class="cart-bot-bar flex">
    <div>
      <input
        type="checkbox"
        class="check"
        :class="{'check-checked':isChecked}"
        @click="clickChecked()"
      />&ensp;
      <label>全部</label>
    </div>
    <div>合计：{{totalPrice}}</div>
    <div>去结算({{CheckedCount}})</div>
  </div>
</template>

<script>
export default {
  name: "CartBotBar",
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    isChecked() {
      return (
        this.$store.state.cartList.filter((item) => {
          return item.checked === true;
        }).length === this.$store.state.cartList.length
      );
    },
    CheckedCount() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked === true;
        })
        .reduce((pre, item) => {
          return pre + item.count;
        }, 0);
    },
  },
  methods: {
    clickChecked() {
      if (this.isChecked) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style lang="less" scoped="scoped">
.cart-bot-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  padding: 0 10px;
  font-size: 13px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  .check {
    width: 18px;
    height: 18px;
    overflow: hidden;
    border-radius: 100%;
    vertical-align: bottom;
    border: 1px solid #ececec;
  }
  .check-checked {
    border: 1px solid var(--color-high-text);
    background: url(~assets/img/detail/check_active.png) no-repeat center;
    background-size: cover;
  }
}
</style>
