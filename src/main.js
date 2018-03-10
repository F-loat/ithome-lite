import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/news/news'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#d22222',
      backgroundColorTop: '#d22222',
      navigationBarBackgroundColor: '#d22222',
      navigationBarTitleText: 'IT之家Lite',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#999',
      selectedColor: '#d22222',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/news/news',
        text: '资讯',
        iconPath: 'static/assets/news.png',
        selectedIconPath: 'static/assets/news-active.png'
      }, {
        pagePath: 'pages/quanzi/quanzi',
        text: '圈子',
        iconPath: 'static/assets/quanzi.png',
        selectedIconPath: 'static/assets/quanzi-active.png'
      }]
    }
  }
}
