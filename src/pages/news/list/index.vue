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
      v-for="item of news",
      :news="item"
      :key="item.newsid")
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'
import newsItem from '@/components/news-item'

export default {
  components: {
    newsItem
  },
  computed: {
    ...mapState([
      'slides',
      'news'
    ])
  },
  mounted () {
    wx.startPullDownRefresh()
  },
  async onPullDownRefresh () {
    await Promise.all([
      this.getNews(2, true),
      this.getSlides()
    ])
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    const { news } = this
    const lastnews = news[news.length - 1]
    this.getNews(Date.parse(new Date(lastnews.postdate)))
  },
  methods: {
    ...mapActions([
      'getSlides',
      'getNews'
    ])
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
  max-width: 90vw;
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
