<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="Color">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // name: TabBarItem,
  props: {
    path: String,
    ActiveColor: {
      type: String,
      default: "red",
    },
  },
  computed: {
    isActive() {
      // this.$route.path指的是当前活跃的路由，
      // this.path指的组件对应的路由
      // 在所有路由中筛选当前点击的路由定义为活跃的路由（ return true）
      return this.$route.path.indexOf(this.path) !== -1;
    },
    Color() {
      // 判断是否处于活跃，若处于活跃，则将activecolor赋值
      return this.isActive ? { color: this.ActiveColor } : {};
    },
  },
  data() {
    return {
      // isActive: true
    };
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-style: 17px;
}
.tab-bar-item img {
  width: 25px;
  height: 25px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>









