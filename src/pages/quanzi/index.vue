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
import api from '@/utils/api'

export default {
  data () {
    return {
      loading: false,
      topics: []
    }
  },
  mounted () {
    this.getTopics()
  },
  onReachBottom () {
    this.getTopics()
  },
  methods: {
    async getTopics () {
      if (this.loading) return
      this.loading = true
      wx.showNavigationBarLoading()
      const { topics } = this
      let rt = Date.now()
      if (topics.length) {
        const lastTopic = topics[topics.length - 1]
        rt = lastTopic.rt.replace(/[^0-9]/ig, '')
      }
      const newTopics = await api.getTopics(rt)
      newTopics.forEach(topic => {
        const { id, c, t, un, vc } = topic
        topic.link = `/pages/qdetail/qdetail?id=${id}&title=${c} ${t}&author=${un}&vc=${vc}`
      })
      this.topics = this.topics.concat(newTopics)
      wx.hideNavigationBarLoading()
      this.loading = false
    }
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
