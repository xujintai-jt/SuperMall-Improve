<template>
  <div id="pro-file">
    <el-container class="profile-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="~assets/img/hzw.jpg" alt />
          <span>CodeXJT</span>
        </div>
        <el-button type="info" plain @click="logout" size="mini">退出登录</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏菜单 -->
        <el-aside width="200px">
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 一级菜单的模板区 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <!-- 图标 -->
                <span>导航一</span>
                <!-- 文本 -->
              </template>

              <!-- 二级菜单 -->
              <el-menu-item index="1-4-1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
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
    //左侧导航栏菜单
  },
};
</script>

<style lang="less" scoped>
#pro-file {
  .profile-container {
    height: 100vh;
    color: white;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    background-color: var(--color-text);
    font-size: 15px;

    div {
      display: flex;
      align-items: center;
      img {
        height: 40px;
        width: 40px;
        margin: 0 10px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #eaedf1;
  }
}
</style>