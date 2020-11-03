<template>
  <div id="detail">
    <!-- <div>{{this.$store.state.carList}}</div> -->
    <detail-navbar class="detail-navbar" @titleClick="titleClick" ref="detailNavbar" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="detailScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info :paramInfo="param" ref="param" />
      <detail-comment-info :commentInfo="commentInfo" ref="commentInfo" />
      <!-- 组件复用 -->
      <goods-list :goods="recommendInfo" ref="recommendInfo" />
    </scroll>
    <back-top @click.native="BackClick" v-show="isShowBackTop"></back-top>
    <detail-bot-bar @addCart="addCart" />
    <toast :message="toastMessage" v-show="toastIsShow" />
  </div>
</template>

<script>
// 子组件类
import DetailNavbar from "./childComponents/DetailNavbar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailRecommendInfo from "./childComponents/DetailRecommendInfo";
import DetailBotBar from "./childComponents/DetailBotBar";

// 公共组件类
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goodslist/GoodsList";
import Toast from "components/common/toast/Toast";

// 方法类
import {
  getDetailItems,
  getRecommend,
  Goods,
  Shop,
  Param,
} from "network/detail.js";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      param: {},
      commentInfo: [],
      recommendInfo: [],
      themeTopYs: [],
      getThemeTopY: null,
      toastIsShow: false,
      toastMessage: "",
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBotBar,
    Scroll,
    GoodsList,
    Toast,
  },
  created() {
    // 1、保存传入的iid,进入detail界面created时，当前的路由为detail/:id，取出路由的id赋值给iid
    this.iid = this.$route.params.iid;
    // 2、调用getDetailItems()方法，根据iid请求详情数据
    this.getDetailItems(this.iid);

    //请求推荐数据
    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommendInfo.$el.offsetTop);
    });
  },
  destroyed() {
    this.$bus.$off("itemImgLoad");
  },
  methods: {
    getDetailItems(iid) {
      getDetailItems(iid).then((res) => {
        const data = res.result;
        // 1、获取顶部的轮播图片信息
        // 保存topImages
        this.topImages = data.itemInfo.topImages;

        // 整合数据
        // 2、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo);
        // 3、创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);
        // 4、保存商品的详情数据
        this.detailInfo = data.detailInfo;
        // 5、获取参数的信息
        this.param = new Param(data.itemParams.info, data.itemParams.rule);
        //6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list;
        }
      });
    },
    imgLoad() {
      // debounce(this.$refs.scroll && this.$refs.scroll.Refresh(), 40);
      this.getThemeTopY();
      this.refresh();
    },
    titleClick(index) {
      switch (index) {
        case 0:
          this.$refs.scroll.ScrollTo(0, this.themeTopYs[index], 200);
          break;
        case 1:
          this.$refs.scroll.ScrollTo(0, -this.themeTopYs[index] + 44, 200);
          break;
        case 2:
          this.$refs.scroll.ScrollTo(0, -this.themeTopYs[index] + 44, 200);
          break;
        case 3:
          this.$refs.scroll.ScrollTo(0, -this.themeTopYs[index] + 44, 200);
          break;
      }
    },
    detailScroll(position) {
      if (-position.y < this.$refs.param.$el.offsetTop - 44) {
        this.$refs.detailNavbar.currentIndex = 0;
      } else if (
        -position.y <
        (this.themeTopYs[2] ? this.themeTopYs[2] : this.themeTopYs[3]) - 44
      ) {
        this.$refs.detailNavbar.currentIndex = 1;
      } else if (-position.y < this.themeTopYs[3] - 44) {
        if (this.themeTopYs[2]) {
          this.$refs.detailNavbar.currentIndex = 2;
        }
      } else {
        this.$refs.detailNavbar.currentIndex = 3;
      }
      this.isShowBackTop = -position.y > 1000;
    },
    addCart() {
      // 1、获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.discountDesc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid;

      // 2、将商品添加到购物车
      this.$store.dispatch("addCart", product).then((res) => {
        this.toastMessage = res;
        this.toastIsShow = true;
        setTimeout(() => {
          this.toastIsShow = false;
        }, 2000);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 9;
}

.detail-navbar {
  background-color: #fff;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>