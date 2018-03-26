import Vue from 'vue'
import Vuex from 'vuex'
import xml2json from 'xmlstring2json'
import { formatSlideList, formatTime } from '@/utils'
import api from '@/utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    slides: [],
    news: [],
    topics: []
  },
  mutations: {
    slides (state, data) {
      state.slides = data
    },
    news (state, data) {
      state.news = data
    },
    topics (state, data) {
      state.topics = data
    }
  },
  actions: {
    async getSlides ({ commit }) {
      const slides = await api.getSlides()
      if (!slides) return
      const parsedSlides = xml2json(slides).rss.channel.item
      const filtedSlides = parsedSlides.filter(
        slide => slide.opentype['#text'] === '1'
      )
      const formatedSlides = filtedSlides.map(formatSlideList)
      commit('slides', formatedSlides)
    },
    async getNews ({ state, commit }, init) {
      const news = await api.getNewslist()
      if (!news) return
      news.newslist.forEach((news) => {
        news.postdate = formatTime(news.postdate)
        news.link = `/pages/news/detail?id=${news.newsid}&title=${news.title}`
      })
      if (init) {
        commit('news', news.newslist)
      } else {
        commit('news', state.news.concat(news.newslist))
      }
    },
    async getTopics ({ state, commit }, init) {
      let rt = Date.now()
      if (!init) {
        const lastTopic = state.topics[state.topics.length - 1]
        rt = lastTopic.rt.replace(/[^0-9]/ig, '')
      }
      const topics = await api.getTopics(rt)
      if (!topics) return
      topics.forEach(topic => {
        const { id, c, t, un, vc, uid } = topic
        topic.link = `/pages/quanzi/detail?id=${id}&title=${c} ${t}&author=${un}&vc=${vc}`
        const headpath = `00${String(uid).padStart(7, '0').replace(/\B([0-9]{2})/g, '/$1')}_60.jpg`
        topic.headimg = `https://avatar.ithome.com/avatars/${headpath}`
      })
      if (init) {
        commit('topics', topics)
      } else {
        commit('topics', state.topics.concat(topics))
      }
    }
  }
})

export default store
