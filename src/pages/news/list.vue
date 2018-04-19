<template lang="pug">
.container
  swiper.slider-wrap(
    v-if="slides.length",
    autoPlay,
    indicator-dots,
    circular,
    indicator-color="rgba(255, 255, 255, .3)",
    indicator-active-color="rgba(210, 34, 34, .7)")
    swiper-item(
      v-for="slide of slides",
      :key="slide.title")
      .slider-item(@click="$router.push(slide.link)")
        .slider-title {{slide.title}}
        img.slider-img(:src="slide.image", mode="aspectFill")
  .news-wrap
    news-item(
      v-for="item of news",
      :news="item"
      :key="item.newsid")
  .nomore 只给看这么多
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
    this.$options.onPullDownRefresh.call(this)
  },
  activated () {
    document.querySelector('.scroll-container').scrollTop = this.scrollTop
  },
  async onPullDownRefresh () {
    await Promise.all([
      this.getNewsList(true),
      this.getSlides()
    ])
    wx.stopPullDownRefresh()
  },
  // onReachBottom () {
  //   return this.getNewsList()
  // },
  methods: {
    ...mapActions([
      'getSlides',
      'getNewsList'
    ])
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

.nomore {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #ddd;
}
</style>

<style lang="less">
@import url("~@/styles/index.less");

.wh_show_bgcolor {
  background-color: @primary-color;
}
</style>
