module.exports = [
  {
    alias: '/',
    path: '/pages/news/list',
    name: 'NewsList',
    meta: {
      nav: true
    },
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/news/detail',
    name: 'NewsDetai',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '文章详情'
    }
  },
  {
    path: '/pages/news/comment',
    name: 'NewsComment',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '评论列表'
    }
  },
  {
    path: '/pages/quanzi/list',
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
    path: '/pages/quanzi/detail',
    name: 'QuanziDetail',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '圈子详情'
    }
  }
]
