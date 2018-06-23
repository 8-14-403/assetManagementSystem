import Vue from 'vue'
import Router from 'vue-router'
import asset from '../components/asset.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '管理界面',
      component: asset
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
  const nextRoute = []
  if (nextRoute.indexOf(to.name) >= 0) {
  } else {
    next()
  }
})
export default router
