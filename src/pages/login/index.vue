<template>
  <div class="login_box">
    <div class="login_l_img"><img src="../../../static/images/login-background.png" /></div>
    <div class="login">
      <div class="login_logo"><a href="#"><img src="../../../static/images/login_logo.png" /></a></div>
      <div class="login_name">
        <p>固定资产管理系统</p>
      </div>
      <el-form>
        <el-input v-model="username" placeholder="用户名"></el-input>
        <el-input v-model="password" type="password" placeholder="密码" @keyup.enter.native="handleSubmit"></el-input>
        <el-form-item style="padding-top: 12px;">
          <el-button style="width:45%;background-color: #21a0c4;color:#fff" @click="handleSubmit" type="submit" :loading="loading">登录</el-button>
          <el-button style="width:45%;background-color: #fff;color: #000;float:right" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="copyright">caojy 版权所有©2018-2019 技术支持电话：15970481474</div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'App',
  data: function () {
    return {
      username: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    handleReset () {
      this.username = ''
      this.password = ''
    },
    handleSubmit () {
      this.loading = true
      if (this.username === '' || this.password === '') {
        this.$message({
          message: '请输入用户名或密码',
          type: 'warning'
        })
        this.loading = false
        return
      }
      let username = encodeURIComponent(this.username)
      let password = encodeURIComponent(this.password)
      this.$http.post('/login?username=' + username + '&password=' + password)
        .then((response) => {
          //  登录失败时，提示失败原因；成功则转向/admin.html页面
          if (response.data !== null && response.data.code === 0) {
            sessionStorage.setItem('username', this.username)
            window.location.href = '/main.html'
          } else if (response.data !== null && response.data.code === -1) {
            this.loading = false
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          } else {
            this.loading = false
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.$message({
            message: '网络连接错误！',
            type: 'error'
          })
          this.loading = false
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
