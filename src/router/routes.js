module.exports = [
  {
    alias: '/',
    path: '/pages/tab/news',
    name: 'NewsList',
    meta: {
      nav: true
    },
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/detail/news',
    name: 'NewsDetail',
    root: '/pages/detail',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '文章详情'
    }
  },
  {
    path: '/pages/tab/quanzi',
    name: 'QuanziList',
    meta: {
      nav: true
    },
    config: {
      navigationBarTitleText: '圈子',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/detail/quanzi',
    name: 'QuanziDetail',
    root: '/pages/detail',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '圈子详情'
    }
  }
]
