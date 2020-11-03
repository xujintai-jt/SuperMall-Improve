<!--
 * @Author: xujintai
 * @Date: 2020-11-02 13:51:41
 * @LastEditors: xujintai
 * @LastEditTime: 2020-11-02 17:13:27
 * @Description: 文件说明
-->
<template>
  <el-form
    :model="dataForm"
    :rules="dataRule"
    ref="dataForm"
    label-width="70px"
    class="demo-ruleForm"
  >
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="dataForm.mobile" size="small" placeholder="请输入手机号码"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password" size="small">
      <el-input v-model="dataForm.password" type="password" placeholder="请输入短信验证码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="loginForm('dataForm')">登录</el-button>
      <el-button type="info" @click="resetForm('dataForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {
        mobile: "13612345678",
        password: "admin",
        // mobile: "",
        // password: "",
      },
      dataRule: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 10, max: 12, message: "长度为11 个字符！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //登录验证
    loginForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/login/password",
          this.dataForm
        );
        console.log(res);
        // 状态码不为0,返回未注册
        if (res.code !== 0) {
          return this.$message.error("手机号未注册");
        }

        // this.$message.success("恭喜你，登录成功");
        this.$message.success({
          message: "登录成功",
          center: true,
          offset: 40,
          duration: 2000,
        });
        // 1、登陆成功以后的token,保存在客户端的sessionStorage中
        //1.1 项目中除了登陆注册以外的其他API接口,必须在登陆以后才能访问
        //1.2 token只应在当前网站打开期间生效，所以token保持在sessionStorage中
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/Home/");
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.demo-ruleForm {
  width: 80vw;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
