// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import router from '../../router'
import VueResource from 'vue-resource'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../../../static/css/main.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
