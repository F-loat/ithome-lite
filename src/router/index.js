/**
 * 有 bug，生产环境勿用
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      alias: '/',
      path: '/pages/news/list',
      name: 'NewsList',
      component: () => import('@/pages/news/list'),
      meta: {
        nav: true
      },
      config: {
        enablePullDownRefresh: true
      }
    },
    {
      path: '/pages/news/detail',
      name: 'NewsDetail',
      component: () => import('@/pages/news/detail'),
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
      component: () => import('@/pages/news/comment'),
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
      component: () => import('@/pages/quanzi/list'),
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
      component: () => import('@/pages/quanzi/detail'),
      meta: {
        nav: false
      },
      config: {
        navigationBarTitleText: '圈子详情'
      }
    }
  ],
  mode: 'history'
})
