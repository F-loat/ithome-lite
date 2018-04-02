<template lang="pug">
.container
  pull-to(
    :top-load-method="refresh",
    :bottom-load-method="loadmore",
    @scroll="saveScrollPosition")
    .topic-wrap
      topicItem(
        v-for="topic of topics",
        :topic="topic"
        :key="topic.id")
</template>

<script>
import wx from 'wx'
import { mapState, mapActions } from 'vuex'
import PullTo from 'vue-pull-to'
import topicItem from '@/components/topic-item'

let scrollTop = 0

export default {
  components: {
    PullTo,
    topicItem
  },
  computed: {
    ...mapState([
      'topics'
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
  onReachBottom () {
    this.loadmore()
  },
  methods: {
    ...mapActions([
      'getTopics'
    ]),
    async refresh (loaded) {
      await this.getTopics(true)
      wx.stopPullDownRefresh()
      if (loaded) loaded()
    },
    async loadmore (loaded) {
      await this.getTopics()
      if (loaded) loaded()
    },
    saveScrollPosition (e) {
      scrollTop = e.srcElement.scrollTop
    }
  }
}
</script>

<style lang="less">
</style>
