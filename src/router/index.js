import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Office from '../tags/Office'
import Produce from '../tags/Produce'
import table from '../tags/table.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/office',
          name: '办公设备',
          component: Office
        },
        {
          path: '/produce',
          name: '生产设备',
          component: Produce
        }
      ]
    },
    {
      path: '/table',
      name: '表格实例',
      component: table
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
