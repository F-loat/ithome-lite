import Vue from 'vue'
import Router from 'vue-router'
import NewsList from '@/pages/news/list'
import NewsDetail from '@/pages/news/detail'
import NewsComment from '@/pages/news/comment'
import QuanziList from '@/pages/quanzi/list'
import QuanziDetail from '@/pages/quanzi/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/pages/news/list',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/pages/news/detail',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/pages/news/comment',
      name: 'NewsComment',
      component: NewsComment
    },
    {
      path: '/pages/quanzi/list',
      name: 'QuanziList',
      component: QuanziList
    },
    {
      path: '/pages/quanzi/detail',
      name: 'QuanziDetail',
      component: QuanziDetail
    }
  ]
})
