<template lang="pug">
.container(v-show="show")
  .topic-title {{topic.title}}
  .topic-num 1楼
  .topic-info
    .topic-info-item
      img.topic-info-icon(src="/static/assets/quan_hit.png")
      span.topic-info-text {{topic.vc}}
    .topic-info-item
      img.topic-info-icon(src="/static/assets/quan_comment.png")
      span.topic-info-text {{topic.rc}}
  rich-text.topic-content(:nodes="topic.content")
  .comment-wrap
    comment-item(
      v-for="comment of topic.reply",
      :key="comment.id",
      :comment="comment")
</template>

<script>
import api from '@/utils/api'
import commentItem from '@/components/comment-item'
import { formatComment } from '@/utils'

export default {
  components: {
    commentItem
  },
  data () {
    return {
      show: false,
      loading: false,
      topic: {}
    }
  },
  mounted () {
    this.getTopic()
  },
  onReachBottom () {
    this.getComments()
  },
  onUnload () {
    this.show = false
  },
  methods: {
    async getTopic () {
      const { query } = this.$root.$mp
      const topic = await api.getTopic(query.id)
      if (!topic) return
      topic.content = topic.content.replace('!--IMG_1--', `img src="${topic.imgs[0]}" width="100%" /`)
      topic.reply = topic.reply.map(formatComment)
      this.topic = Object.assign({
        title: decodeURI(query.title)
      }, topic)
      this.show = true
    },
    async getComments () {
      if (this.loading) return
      this.loading = true
      const { query } = this.$root.$mp
      const comments = this.topic.reply
      const lastComment = comments[comments.length - 1]
      const newComments = await api.getTopicComments(query.id, lastComment.id)
      if (!newComments) return
      const formatedComments = newComments.map(formatComment)
      this.topic.reply = this.topic.reply.concat(formatedComments)
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.topic-title {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 22px;
}
.topic-num {
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.topic-info {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.topic-info-item {
  margin-right: 10px;
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
.topic-content {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  line-height: 1.6;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  min-height: 100px;
}

.comment-wrap {
  width: 100%;
}
</style>
