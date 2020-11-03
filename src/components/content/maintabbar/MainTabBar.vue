<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/Home/" ActiveColor="blue">
        <!-- 在webpack.base.conf.js的resplove中alias（别名）中定义别名，在src中使用时前方要加~符号,import前方不能加符号 -->
        <img slot="item-icon" src="~assets/img/tabbar/icon01.png" />
        <img slot="item-icon-active" src="~assets/img/tabbar/icon01_active.png" />
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/Category/" ActiveColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/icon02.png" />
        <img slot="item-icon-active" src="~assets/img/tabbar/icon02_active.png" />
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/Cart/" ActiveColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/icon03.png" />
        <img slot="item-icon-active" src="~assets/img/tabbar/icon03_active.png" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/Profile/" ActiveColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/icon04.png" />
        <img slot="item-icon-active" src="~assets/img/tabbar/icon04_active.png" />
        <div slot="item-text">我的</div>
      </tab-bar-item>

      <!-- 登录页面 -->
      <!-- <tab-bar-item path="/Login/" ActiveColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/icon04.png" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/icon04_active.png"
        />
        <div slot="item-text">login</div>
      </tab-bar-item>-->
    </tab-bar>
  </div>
</template>

<script>
// <!-- 在webpack.base.conf.js的resolve中alias（别名）中定义别名，在src中使用时前方要加~符号,import前方不需要加符号 -->
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style></style>
