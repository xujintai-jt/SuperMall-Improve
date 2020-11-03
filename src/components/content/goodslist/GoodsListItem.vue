<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImg" class="goods-list-img" @load="imgLoad" />
    <div class="goods-list-text">
      <div class="goods-list-name one-txt-cut">{{goodsItem.title}}</div>
      <div class="goods-list-price">
        <div class="text-pink">{{goodsItem.price}}</div>
        <div>
          <i class="collect-icon"></i>
          <span>{{goodsItem.cfav}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      // 方法1 发射事件总线，detail或者home根据路由（this.$route） 是否活跃(actived) 来判断 执行全局事件 或 取消监听全局事件
      this.$bus.$emit("itemImgLoad");

      // 方法2 根据不同路由进行发射不同事件总线
      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("homeItemImgLoad");
      // } else if (this.$route.path.indexOf("/detail")) {
      //   this.$bus.$emit("detailItemImgLoad");
      // }
    },
    itemClick() {
      this.$router.push("/Detail/" + this.goodsItem.iid);
    },
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
};
</script>


<style  scoped>
.goods-list-item {
  width: 49%;
  height: auto;
  padding-top: 6px;
  font-size: 14px;
}
.goods-list-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.goods-list-price {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}
.collect-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(~assets/img/home/collect_icon.png) no-repeat;
  background-size: cover;
  vertical-align: bottom;
}
</style>