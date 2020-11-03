<template>
  <div id="detail-navbar">
    <nav-bar class="nav-bar">
      <div slot="left" @click="backClick">
        <img src="~assets/img/fanhui.png" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          :class="{'active':index === currentIndex}"
          @click="titleItemsClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  props: {
    DetailItems: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleItemsClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped >
#detail-navbar {
  height: 44px;
}

.nav-bar {
  border-bottom: 1px solid #ececec;
}

.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-text);
}

.left img {
  vertical-align: middle;
  height: 35px;
  width: 35px;
}
</style>