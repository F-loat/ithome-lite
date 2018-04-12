module.exports = [
  {
    path: '/pages/news/list',
    name: 'NewsList',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/news/detail',
    name: 'NewsDetail',
    config: {
      navigationBarTitleText: '文章详情'
    }
  },
  {
    path: '/pages/news/comment',
    name: 'NewsComment',
    config: {
      navigationBarTitleText: '评论列表'
    }
  },
  {
    path: '/pages/quanzi/list',
    name: 'QuanziList',
    config: {
      navigationBarTitleText: '圈子',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/quanzi/detail',
    name: 'QuanziDetail',
    config: {
      navigationBarTitleText: '圈子详情'
    }
  }
]
