<template>
  <div id="pro-file">
    <el-button type="info" plain class="exit-btn" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
// import Scroll from "components/common/scroll/Scroll";
export default {
  // components: {
  //   Scroll,
  // },
  methods: {
    //退出登录
    logout() {
      // 清空token
      // window.sessionStorage.removeItem("token");
      window.sessionStorage.clear("token");
      this.$message({
        message: "退出成功",
        center: true,
        offset: 40,
        duration: 2000,
      });
      //跳转到登录页
      this.$router.push("/Login/");
    },
  },
};
</script>

<style lang="less" scoped>
#pro-file {
  position: relative;
  // .exit-btn {
  // }
}
</style>