<template lang="pug">
.container
  .topic-wrap
    topicItem(
      v-for="topic of topics",
      :topic="topic"
      :key="topic.id")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { platform } from '@/utils'
import topicItem from '@/components/topic-item'

export default {
  components: {
    topicItem
  },
  computed: {
    ...mapState([
      'topics'
    ])
  },
  mounted () {
    uni.startPullDownRefresh()
  },
  async onPullDownRefresh () {
    await this.getTopics(true)
    uni.stopPullDownRefresh()
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
</style>
