import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './stylesheet/reset.css'
import './until/index'
import qs from 'qs'
Vue.prototype.$qs = qs
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
