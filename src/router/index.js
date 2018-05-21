import Vue from 'vue'
import Router from 'vue-router'
import first from '../components/public/onepage.vue'
import table from '../components/table.vue'
import asset from '../components/asset.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '管理界面',
      component: first
    },
    {
      path: '/Table',
      name: '表格实例',
      component: table
    },
    {
      path: '/Asset',
      name: '固定资产表格',
      component: asset
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const nextRoute = ['办公设备', '生产设备', 'HelloWorld']
  if (nextRoute.indexOf(to.name) >= 0) {
  } else {
    next()
  }
})
export default router
