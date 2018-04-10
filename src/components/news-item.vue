<template lang="pug">
.news-item(
  @click="turn",
  v-if="!news.lapinid")
  img.news-img(:src="news.image", mode="aspectFill")
  .news-text
    .news-title {{news.title}}
    .news-info
      text {{news.postdate}}
      text(v-if="news.commentcount") {{news.commentcount}}评
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    turn () {
      const { link } = this.news
      this.$router.push(link)
    }
  }
}
</script>

<style lang="less" scoped>
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
