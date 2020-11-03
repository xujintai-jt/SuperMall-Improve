<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active:index===currentIndex}"
      @click="itemClick(item,index)"
    >{{item.title?item.title:item}}</div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(item, index) {
      this.currentIndex = index;
      this.$emit("CateTabClick", item);
      console.log(index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  position: relative;
  display: flex;
  flex-direction: column;
  top: 44px;
  left: 0;
  height: calc(100vh - 93px);
  width: 90px;
  background-color: rgba(209, 209, 209, 0.883);
  font-size: 14px;
  text-align: center;
  line-height: calc((100vh - 93px) / 16);
}
.tab-control-item {
  flex: 1;
}
.active {
  color: #ff8198;
  background-color: #fff;
}
</style>