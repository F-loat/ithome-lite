<template lang="pug">
.container
  swiper.slider-wrap(autoplay, indicator-dots, circular)
    swiper-item(
      v-for="(slide, index) of slides",
      v-if="slide.opentype == 1",
      :key="index")
      a.slider-item(:href="slide.link")
        text.slider-title {{slide.title}}
        img.slider-img(:src="slide.image", mode="aspectFill")
  .news-wrap
    a.news-item(
      :href="news.link",
      v-for="news of news.newslist",
      :key="news.newsid",
      v-if="!news.lapinid")
      img.news-img(:src="news.image", mode="aspectFill")
      .news-text
        .news-title {{news.title}}
        .news-info
          text {{news.postdate}}
          text {{news.commentcount}}评
</template>

<script>
import xml2json from 'xmlstring2json'
import api from '@/utils/api'
import { formatTime } from '@/utils'

export default {
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
  created () {
    this.getSlides()
    this.getNewslist(null, true)
  },
  onPullDownRefresh () {
    this.getNewslist(null, true)
  },
  onReachBottom () {
    if (this.loading) return
    const { newslist } = this.news
    const lastnews = newslist[newslist.length - 1]
    this.getNewslist(Date.parse(new Date(lastnews.postdate)))
  },
  methods: {
    async getSlides() {
      const slides = await api.getSlides()
      this.slides = xml2json(slides).rss.channel.item.map(slide => {
        return {
          title: slide.title['#text'],
          image: slide.image['#text'],
          device: slide.device['#text'],
          opentype: slide.opentype['#text'],
          newstype: slide.newstype['#text'],
          link: `/pages/ndetail/ndetail?id=${slide.link['#text']}&title=${slide.title['#text']}`,
        }
      })
    },
    async getNewslist(r = Date.now(), init) {
      this.loading = true
      wx.showLoading({ title: '加载中' })
      const news = await api.getNewslist(r)
      news.toplist.forEach((news) => {
        news.postdate = formatTime(news.postdate)
        news.link = `/pages/ndetail/ndetail?id=${news.newsid}&title=${news.title}`
      })
      news.newslist.forEach((news) => {
        news.postdate = formatTime(news.postdate)
        news.link = `/pages/ndetail/ndetail?id=${news.newsid}&title=${news.title}`
      })
      if (init) {
        this.news = news
        wx.stopPullDownRefresh()
      } else {
        this.news.toplist = this.news.toplist.concat(news.toplist)
        this.news.newslist = this.news.newslist.concat(news.newslist)
      }
      wx.hideLoading()
      this.loading = false
    }
  }
}
</script>

<style scoped>
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
.news-item {
  display: flex;
  height: 90px;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.news-img {
  width: 100px;
  height: 75px;
  margin-right: 10px;
}
.news-text {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.news-title {
  font-size: 15px;
}
.news-info {
  color: #aaa;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
