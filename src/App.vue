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
  keep-alive
    router-view
</template>

<script>
export default {
  name: 'App',
  mpType: 'app'
}
</script>

<style lang="less">
@import url("~@/styles/index.less");

#app {
  max-width: 540px;
  margin: 0 auto;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
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
