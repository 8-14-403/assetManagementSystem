import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Office from '@/tags/Office'
import Produce from '@/tags/Produce'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
