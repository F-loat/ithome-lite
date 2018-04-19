<template lang="pug">
#app
  .nav(v-if="$route.meta.nav")
    router-link.nav-item(to="/pages/news/list", replace)
      img.nav-icon(v-if="$route.name === 'NewsList'", src="/static/assets/news-active.png")
      img.nav-icon(v-else, src="/static/assets/news.png")
      .nav-title(:class="{ active: $route.name === 'NewsList' }") 资讯
    router-link.nav-item(to="/pages/quanzi/list", replace)
      img.nav-icon(v-if="$route.name === 'QuanziList'", src="/static/assets/quanzi-active.png")
      img.nav-icon(v-else, src="/static/assets/quanzi.png")
      .nav-title(:class="{ active: $route.name === 'QuanziList' }") 圈子
  pull-to(
    ref="scroller",
    :top-load-method="refresh",
    :bottom-load-method="loadmore",
    :is-top-bounce="!!onPullDownRefresh",
    :is-bottom-bounce="!!onReachBottom",
    @scroll="saveScrollPosition")
    keep-alive
      router-view(ref="current")
</template>

<script>
import PullTo from 'vue-pull-to'

export default {
  name: 'App',
  mpType: 'app',
  components: {
    PullTo
  },
  data () {
    return {
      onPullDownRefresh: null,
      onReachBottom: null
    }
  },
  methods: {
    async refresh (loaded) {
      await this.onPullDownRefresh.call(this.$refs.current)
      loaded()
    },
    async loadmore (loaded) {
      await this.onReachBottom.call(this.$refs.current)
      loaded()
    },
    saveScrollPosition (e) {
      const { current } = this.$refs
      current.scrollTop = e.srcElement.scrollTop
    }
  },
  watch: {
    $route () {
      this.$nextTick(() => {
        const { current } = this.$refs
        if (!current) return
        this.onPullDownRefresh = current.$options.onPullDownRefresh
        this.onReachBottom = current.$options.onReachBottom
      })
    }
  }
}
</script>

<style lang="less">
@import url("~@/styles/index.less");

#app {
  max-width: 540px;
  margin: 0 auto;
  height: 100vh;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}

a {
  color: #222;
  text-decoration: none;
}

img {
  object-fit: cover;
}

.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 55px;
  width: 100%;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #eee;
  z-index: 1;
}
.nav + .container {
  padding-bottom: 54px;
}
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-icon {
  width: 30px;
  height: 30px;
}
.nav-title {
  color: #aaa;
  font-size: 12px;
  &.active {
    color: @primary-color;
  }
}
</style>
