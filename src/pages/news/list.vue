<template lang="pug">
.container
  pull-to(
    :top-load-method="refresh",
    @scroll="saveScrollPosition"
    ref="scroller")
    swiper.slider-wrap(
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
import PullTo from 'vue-pull-to'
import newsItem from '@/components/news-item'

let scrollTop = 0

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
  activated () {
    document.querySelector('.scroll-container').scrollTop = scrollTop
  },
  onPullDownRefresh () {
    this.refresh()
  },
  // onReachBottom () {
  //   this.loadmore()
  // },
  methods: {
    ...mapActions([
      'getSlides',
      'getNewsList'
    ]),
    async refresh (loaded) {
      await Promise.all([
        this.getNewsList(true),
        this.getSlides()
      ])
      wx.stopPullDownRefresh()
      if (loaded) loaded()
    },
    // async loadmore (loaded) {
    //   await this.getNewsList()
    //   if (loaded) loaded()
    // },
    saveScrollPosition (e) {
      scrollTop = e.srcElement.scrollTop
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

.nomore {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #ddd;
}
</style>
