module.exports = [
  {
    alias: '/',
    path: '/pages/tab/news',
    name: 'NewsList',
    meta: {
      nav: true
    }
  },
  {
    path: '/pages/detail/news',
    name: 'NewsDetail',
    root: '/pages/detail',
    meta: {
      nav: false
    }
  },
  {
    path: '/pages/tab/quanzi',
    name: 'QuanziList',
    meta: {
      nav: true
    }
  },
  {
    path: '/pages/detail/quanzi',
    name: 'QuanziDetail',
    root: '/pages/detail',
    meta: {
      nav: false
    }
  }
]
