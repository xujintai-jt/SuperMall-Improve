<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImgLoad" alt />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  data() {
    return {
      IsLoad: false
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  // props: ["banners"],
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 轮播图图片加载完毕
    swiperImgLoad() {
      if (!this.IsLoad) {
        this.$emit("swiperImgLoad");
        this.IsLoad = true;
      }
    }
  }
};
</script>

<style>
</style>