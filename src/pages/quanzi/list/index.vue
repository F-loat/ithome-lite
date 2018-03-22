<template lang="pug">
.container
  .topic-wrap
    a.topic-item(
      :href="topic.link",
      v-for="topic of topics",
      :key="topic.id")
      .topic-title {{topic.c}} {{topic.t}}
      .topic-info
        .topic-info-item {{topic.un}}
        .topic-info-item {{topic.cn}}
        .topic-info-item
          img.topic-info-icon(src="/static/assets/quan_hit.png")
          span.topic-info-text {{topic.vc}}
        .topic-info-item
          img.topic-info-icon(src="/static/assets/quan_comment.png")
          span.topic-info-text {{topic.rc}}
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'topics'
    ])
  },
  mounted () {
    wx.startPullDownRefresh()
  },
  async onPullDownRefresh () {
    await this.getTopics(true)
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.getTopics()
  },
  methods: {
    ...mapActions([
      'getTopics'
    ])
  }
}
</script>

<style lang="less">
.topic-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.topic-title {
  font-size: 16px;
}
.topic-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}
.topic-info-item {
  margin-left: 10px;
  font-size: 12px;
  color: #aaa;
  display: flex;
  align-items: center;
}
.topic-info-icon {
  width: 15px;
  height: 15px;
  margin-right: 4px;
}
</style>
