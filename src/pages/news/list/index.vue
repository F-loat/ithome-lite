<template lang="pug">
.container
  swiper.slider-wrap(autoPlay, showIndicator, v-if="slides.length > 0")
    swiper-item(
      v-for="slide of slides",
      :key="slide.link")
      router-link.slider-item(:to="slide.link")
        .slider-title {{slide.title}}
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
import { Swiper, Slide } from 'vue-swiper-component'
import newsItem from '@/components/news-item'

export default {
  components: {
    Swiper,
    SwiperItem: Slide,
    newsItem
  },
  computed: {
    ...mapState([
      'slides',
      'news'
    ])
  },
  mounted () {
    this.onPullDownRefresh()
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
    ]),
    async onPullDownRefresh () {
      await Promise.all([
        this.getNews(2, true),
        this.getSlides()
      ])
      wx.stopPullDownRefresh()
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
