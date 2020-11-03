<template>
  <div class="Cart">
    <nav-bar class="cart-nav">
      <slot slot="center">
        <div>购物车({{cartListAddCount}})</div>
      </slot>
    </nav-bar>
    <scroll class="cart-scroll" ref="scroll">
      <!-- 购物车bar -->
      <cart-list></cart-list>
    </scroll>
    <cart-bot-bar></cart-bot-bar>
  </div>
</template>

<script>
// 公共组件类
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

// 子组件类
import CartList from "./childCopm/CartList.vue";
import CartBotBar from "./childCopm/CartBotBar.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBotBar,
  },
  computed: {
    ...mapGetters(["cartListLength", "cartListAddCount"]),
  },
  activated() {
    this.$refs.scroll.Refresh();
  },
};
</script>

<style lang="less" scoped="scoped">
.cart-nav {
  color: #fff;
  background-color: var(--color-high-text);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // z-index: 1;
}

.Cart {
  height: 100vh;
}
.cart-scroll {
  height: calc(100% - 49px - 42px - 42px);
}
</style>