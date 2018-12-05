<template lang="pug">
.container
  .topic-wrap
    topicItem(
      v-for="topic of topics",
      :topic="topic"
      :key="topic.id")
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'
import { platform } from '@/utils'
import topicItem from '@/components/topic-item'

export default {
  config: {
    navigationBarTitleText: '圈子',
    enablePullDownRefresh: true
  },
  components: {
    topicItem
  },
  computed: {
    ...mapState([
      'topics'
    ])
  },
  mounted () {
    if (platform === 'h5') {
      this.$options.onPullDownRefresh.call(this)
    } else {
      wx.startPullDownRefresh()
    }
  },
  activated () {
    document.querySelector('.scroll-container').scrollTop = this.scrollTop
  },
  async onPullDownRefresh () {
    await this.getTopics(true)
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    return this.getTopics()
  },
  methods: {
    ...mapActions([
      'getTopics'
    ])
  }
}
</script>

<style lang="less">
</style>
