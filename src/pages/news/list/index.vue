<template lang="pug">
.container
  pull-to(:top-load-method="refresh", :bottom-load-method="loadmore")
    swiper.slider-wrap(autoPlay, showIndicator, v-if="slides.length > 0")
      swiper-item(
        v-for="slide of slides",
        :key="slide.link")
        router-link.slider-item(:to="slide.link")
          .slider-title {{slide.title}}
          img.slider-img(:src="slide.image", mode="aspectFill")
    .news-wrap
      news-item(
        v-for="(item, index) of news",
        :news="item"
        :key="index")
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'
import { Swiper, Slide } from 'vue-swiper-component'
import PullTo from 'vue-pull-to'
import newsItem from '@/components/news-item'

export default {
  components: {
    Swiper,
    SwiperItem: Slide,
    PullTo,
    newsItem
  },
  computed: {
    ...mapState([
      'slides',
      'news'
    ])
  },
  mounted () {
    this.refresh()
  },
  onPullDownRefresh () {
    this.refresh()
  },
  onReachBottom () {
    this.loadmore()
  },
  methods: {
    ...mapActions([
      'getSlides',
      'getNews'
    ]),
    async refresh (loaded) {
      await Promise.all([
        this.getNews({ r: 2, init: true }),
        this.getSlides()
      ])
      wx.stopPullDownRefresh()
      if (loaded) loaded()
    },
    async loadmore (loaded) {
      const { news } = this
      const lastnews = news[news.length - 1]
      await this.getNews({ r: Date.parse(new Date(lastnews.postdate)) })
      if (loaded) loaded()
    }
  }
}
</script>

<style lang="less" scoped>
.slider-wrap {
  width: 100%;
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
  height: 200px;
}

.news-wrap {
  padding: 0 10px;
}
</style>
