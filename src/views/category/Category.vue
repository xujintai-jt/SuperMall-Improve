<template>
  <div id="cate-gory">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <cate-tab-control :titles="categorylist" @CateTabClick="CateTabClick"></cate-tab-control>
    <scroll class="cate-scroll">
      <cate-column :goods="subcatelist"></cate-column>
      <tab-control :titles="['综合','新品','销量']" class="cate-tab-control-heng"></tab-control>
    </scroll>
  </div>
</template>

<script>
// 公共组件类
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import Scroll from "components/common/scroll/Scroll";

// 子组件类
import CateTabControl from "./childComponents/CateTabControl";
import CateColumn from "./childComponents/CateColumn";

// 方法类
import { GetCateGory, GetSubCateGory } from "network/category";

export default {
  data() {
    return {
      categorylist: [],
      subcatelist: [],
      maitKey: 3627,
    };
  },
  components: {
    NavBar,
    TabControl,
    Scroll,
    CateTabControl,
    CateColumn,
  },
  created() {
    this.GetCateGory();
    this.GetSubCateGory(this.maitKey);
  },
  methods: {
    // 事件监听类

    // 监听CateTabControl中被点击的item（取出它的maitKey）
    CateTabClick(item) {
      this.maitKey = item.maitKey;
      this.GetSubCateGory(this.maitKey);
    },

    // 数据请求类
    GetCateGory() {
      GetCateGory().then((res) => {
        this.categorylist = res.data.category.list;
      });
    },
    GetSubCateGory(maitKey) {
      GetSubCateGory(maitKey).then((res) => {
        this.subcatelist = res.data.list;
      });
    },
  },
};
</script>

<style scoped>
.cate-nav {
  background-color: #ff8198;
  color: white;
}
.cate-tab-control-heng {
  width: calc(100vw - 100px);
}
.cate-scroll {
  position: absolute;
  top: 45px;
  right: 0;
  left: 90px;
  height: calc(100vh - 90px);
  width: calc(100vw - 90px);
  overflow: hidden;
}
.cate-scroll ul {
  color: #ffffff;
}
</style>