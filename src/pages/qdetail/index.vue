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
    .comment-item(v-for="comment of topic.reply", :key="comment.F")
      .comment-header
        .comment-author {{comment.M.N}}
        .comment-phone {{comment.M.Ta}}
        .comment-num {{comment.F}}楼
      rich-text.comment-content(:nodes="comment.M.C")
</template>

<script>
import api from '@/utils/api'

export default {
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
      wx.showNavigationBarLoading()
      const { query } = this.$root.$mp
      const topic = await api.getTopic(query.id)
      topic.content = topic.content.replace('!--IMG_1--', `img src="${topic.imgs[0]}" width="100%" /`)
      topic.reply.forEach(comment => {
        comment.M.C = comment.M.C.replace(/<img/g, '<img width="100%"')
      })
      this.topic = Object.assign({}, query, topic)
      wx.hideNavigationBarLoading()
      this.show = true
    },
    async getComments () {
      if (this.loading) return
      this.loading = true
      wx.showNavigationBarLoading()
      const { query } = this.$root.$mp
      const comments = this.topic.reply
      const lastComment = comments[comments.length - 1]
      const newComments = await api.getTopicComments(query.id, lastComment.M.Ci)
      this.topic.reply = this.topic.reply.concat(newComments)
      wx.hideNavigationBarLoading()
      this.loading = false
    }
  }
}
</script>

<style scoped>
.topic-title {
  width: 100%;
  padding-top: 10px;
  padding-left: 10px;
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
  padding: 10px;
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

.comment-item {
  padding: 10px;
  border-bottom: 1px dashed #eee;
}
.comment-item:last-child {
  border: none;
}
.comment-header {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  font-size: 15px;
}
.comment-author {
  color: #4769b0;
  margin-right: 5px;
}
.comment-num {
  font-size: 12px;
  flex: 1;
  text-align: right;
}
.comment-content {
  line-height: 1.6;
  font-size: 16px;
}
</style>
