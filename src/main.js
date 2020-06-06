// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { version } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //避免后期打包样式不同，要放在import App from './App';之前
import echarts from 'echarts'
import storeLocal from 'storejs';
import notify from './utils/notify.js'

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$storeLocal = storeLocal;
Vue.prototype.$notify = notify

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
