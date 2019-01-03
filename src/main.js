import Vue from 'vue'
import store from '@/store'
import App from '@/App'

Vue.config.productionTip = false
Vue.prototype.$store = store

const app = new Vue({
  store,
  ...App
})
app.$mount()
