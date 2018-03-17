<template lang="pug">
.container
  swiper.slider-wrap(autoplay, indicator-dots, circular)
    swiper-item(
      v-for="slide of slides",
      :key="slide.link")
      a.slider-item(:href="slide.link")
        text.slider-title {{slide.title}}
        img.slider-img(:src="slide.image", mode="aspectFill")
  .news-wrap
    news-item(
      v-for="news of news.newslist",
      :news="news"
      :key="news.newsid")
</template>

<script>
import xml2json from 'xmlstring2json'
import api from '@/utils/api'
import { formatTime } from '@/utils'
import newsItem from '@/components/news-item'

export default {
  components: {
    newsItem
  },
  data () {
    return {
      loading: false,
      slides: [],
      news: {
        toplist: [],
        newslist: []
      }
    }
  },
  mounted () {
    this.getSlides()
    this.getNewslist(2, true)
  },
  onPullDownRefresh () {
    this.getNewslist(2, true)
  },
  onReachBottom () {
    if (this.loading) return
    const { newslist } = this.news
    const lastnews = newslist[newslist.length - 1]
    this.getNewslist(Date.parse(new Date(lastnews.postdate)))
  },
  methods: {
    async getSlides () {
      const slides = await api.getSlides()
      const parsedSlides = xml2json(slides).rss.channel.item
      const filtedSlides = parsedSlides.filter(slide => slide.opentype['#text'] === '1')
      const formatedSlides = filtedSlides.map(slide => {
        return {
          title: slide.title['#text'],
          image: slide.image['#text'],
          link: `/pages/ndetail/ndetail?id=${slide.link['#text']}&title=${slide.title['#text']}`
        }
      })
      this.slides = formatedSlides
    },
    async getNewslist (r = Date.now(), init) {
      this.loading = true
      wx.showNavigationBarLoading()
      const news = await api.getNewslist(r)
      news.toplist.forEach((news) => {
        news.postdate = formatTime(news.postdate)
        news.link = `/pages/news/detail?id=${news.newsid}&title=${news.title}`
      })
      news.newslist.forEach((news) => {
        news.postdate = formatTime(news.postdate)
        news.link = `/pages/news/detail?id=${news.newsid}&title=${news.title}`
      })
      if (init) {
        this.news = news
        wx.stopPullDownRefresh()
      } else {
        this.news.toplist = this.news.toplist.concat(news.toplist)
        this.news.newslist = this.news.newslist.concat(news.newslist)
      }
      wx.hideNavigationBarLoading()
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.slider-wrap {
  width: 375px;
  height: 200px;
}
.slider-item {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.slider-title {
  position: absolute;
  top: 10px;
  right: 0;
  background-color: rgba(0, 0, 0, .3);
  color: #fff;
  padding: 2px 6px;
  font-size: 18px;
}
.slider-img {
  width: 100%;
  height: 100%;
}

.news-wrap {
  padding: 0 10px;
}
</style>
