<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @TabClick="TabClick"
      ref="tabControl1"
      v-show="IsTabFixed"
      class="tab-control-outScroll"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @TabClick="TabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="BackClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 子组件类
import HomeSwiper from "./childCompons/HomeSwiper";
import HomeRecommendView from "./childCompons/HomeRecommendView";
import FeatureView from "./childCompons/FeatureView";

// 公共组件类
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodslist/GoodsList";

// 方法类
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      IsTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {},
  activated() {
    this.$refs.scroll.Refresh();
    this.$refs.scroll.ScrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件的监听 取消监听的事件，执行所监听事件的方法
    this.$bus.$off("itemImgLoad");
  },

  methods: {
    // 事件监听相关的方法
    TabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1、判断backTop是否显示
      this.isShowBackTop = -position.y > 1500;

      ///2、决定tabControl是否吸顶（position：fixed）
      this.IsTabFixed = -position.y >= this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.FinishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-text);
  color: white;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control-outScroll {
  position: relative;
  z-index: 9;
  top: 44px;
  left: 0;
  right: 0;
}
</style>