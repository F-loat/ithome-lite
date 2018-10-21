import Vue from 'vue'
import Toast from 'vue2-toast'
import { Swiper, Slide } from 'vue-swiper-component'
import PullTo from 'vue-pull-to'
import router from '@/router'
import store from '@/store'
import App from '@/App'
import 'minireset.css'
import 'vue2-toast/lib/toast.css'

Vue.use(Toast)
Vue.component('PullTo', PullTo)
Vue.component('Swiper', Swiper)
Vue.component('SwiperItem', Slide)
Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})
app.$mount()
