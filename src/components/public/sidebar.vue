<template>
    <div class="sidebar">
      <el-menu :default-active="$route.path"  class="el-menu-vertical" unique-opened  router>
        <template v-for="i in item">
          <template v-if="i.sublist">
            <el-submenu  :index="i.index" :key="i.index">
              <template slot="title"><i  :class="i.icon"></i>{{i.title}}</template>
              <el-menu-item  v-for="(subItem, myIndex) in i.sublist" :index="subItem.toPath" :key="myIndex"  >
                {{subItem.title}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="i.index" :key="i.index">
              <i :class="i.icon"></i>
              {{i.title}}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
</template>

<script>

export default {
  name: '',
  data: function () {
    return {
      item: [
        {
          icon: 'el-icon-document',
          index: 'office',
          title: '办公设备',
          sublist: [
            {
              toPath: '/Asset',
              title: '低值资产'
            },
            {
              toPath: '/Test',
              title: '固定资产'
            }
          ]
        },
        {
          icon: 'el-icon-printer',
          index: 'instrument',
          title: '仪器仪表',
          sublist: [
            {
              toPath: '/Basicfrom',
              title: '低值资产'
            },
            {
              toPath: '/Upflie',
              title: '固定资产'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes: function () {
      console.log(this.$route.path)
      // $route.path表示当前路由，:index能直接跳转路由
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>
  .sidebar{
    position:absolute;
    display: block;
    width:200px;
    top:60px;
    left:0;
    bottom:0;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
