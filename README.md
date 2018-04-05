# ithome-lite ([WEB 版](https://github.com/F-loat/ithome-lite/tree/web-version))

> IT之家小程序版客户端


## 截图展示
<p>
  <img alt="新闻列表" src="./screenshots/news.jpg" width="33%" />
  <img alt="新闻详情" src="./screenshots/detail.jpg" width="33%" />
  <img alt="圈子列表" src="./screenshots/quanzi.jpg" width="33%" />
</p>


## Tips

* flyio 使用方法

具体内容参见 [微信小程序中使用flyio](https://wendux.github.io/dist/#/doc/flyio/wx)，这里提示下小程序中需要引入的是 `flyio/dist/npm/wx.js` 这个文件，可以配置下 webpack 的 alias 方便调用

``` js
alias: {
  '@': resolve('src'),
  vue: 'mpvue',
  flyio: 'flyio/dist/npm/wx',
  wx: resolve('src/utils/wx')
}
```

* vuex 使用方法

建立 `src/store/index.js` 文件

``` js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  }
})

export default store
```

在 `src/main.js` 中引用

``` js
import Vue from 'vue'
import store from '@/store'
import App from '@/App'

const app = new Vue({
  store,
  ...App
}).$mount()
```

最后在需要使用 vuex 的页面相对应的 `main.js` 文件中像 `src/main.js` 一样引用即可


## 部分 api 列表

* 新闻列表 https://api.ithome.com/json/newslist/news?r=0
* 文章详情 https://api.ithome.com/xml/newscontent/350/412.xml
* 相关文章 https://api.ithome.com/json/tags/0350/350362.json
* 最热评论 https://dyn.ithome.com/json/hotcommentlist/350/87a8e5b144d81938.json
* 评论列表 https://dyn.ithome.com/json/commentlist/350/87a8e5b144d81938.json
* 评论详情 https://dyn.ithome.com/json/commentcontent/d739ee8f2ceb0a27.json
* 轮播新闻 https://api.ithome.com/xml/slide/slide.xml
* 圈子列表 https://apiquan.ithome.com/api/post?categoryid=0&type=0&orderTime=&visistCount&pageLength
* 圈子详情 https://apiquan.ithome.com/api/post/236076
* 圈子评论 https://apiquan.ithome.com/api/reply?postid=236076&replyidlessthan=3241294

