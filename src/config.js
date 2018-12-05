const pages = require('./router/routes')

module.exports = {
  pages,
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
    list: [
      {
        pagePath: 'pages/tab/news',
        text: '资讯',
        iconPath: 'static/assets/news.png',
        selectedIconPath: 'static/assets/news-active.png'
      },
      {
        pagePath: 'pages/tab/quanzi',
        text: '圈子',
        iconPath: 'static/assets/quanzi.png',
        selectedIconPath: 'static/assets/quanzi-active.png'
      }
    ]
  }
}
