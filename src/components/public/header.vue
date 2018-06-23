<template>
   <div class="header">
      <div class="billlogo">固定资产管理系统</div>
      <div class="userimgbox">
        <el-dropdown @command="handleCommand" style="color: #fff; margin-right: 40px;">
          <span class="el-dropdown-link">
            <img class="userimg" src="../../../static/images/login_logo.png">
            {{ username }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账号设置</el-dropdown-item>
            <el-dropdown-item>我的主页</el-dropdown-item>
            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
   </div>
</template>

<script>
/* eslint-disable */
export default {
  name: '',
  data: function () {
    return {
      username: ''
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('确认退出吗?', '提示', {})
          .then(() => {
            this.$http.post('/logout')
              .then((response) => {
                if (response.data !== null && response.data.code === 0) {
                  sessionStorage.removeItem('username')
                  window.location.href = '/login.html'

                } else {
                  this.$message({
                    message: '登出失败！',
                    type: 'error'
                  })
                }
              })
          })
          .catch(() => {})
      }
    }
  },
  created: function () {
    this.username = sessionStorage.getItem('username')
  }
}
</script>

<style scoped>
   .header{
      position:relative;
      top: 0;
      left: 0;
      width:100%;
      height:60px;
      line-height: 60px;
     color: white;
      background-color: #475669;
   }
  .billlogo{
    text-align: left;
    margin-left: 20px;
    float: left;
  }
  .userimgbox{
    float: right;
    height:60px;
  }
  .userimg{
    width: 30px;
    height: 30px;
    border-radius: 100%;
    vertical-align:middle
  }
</style>
