<template lang="pug">
.container(v-show="show")
  .comment-wrap
    .comment-item(v-for="comment of comments", :key="comment.M.SF")
      .comment-header
        .comment-author {{comment.M.N}}
        .comment-phone {{comment.M.Ta}}
        .comment-num {{comment.M.SF}}
      .comment-content {{comment.M.C}}
</template>

<script>
import api from '@/utils/api'

export default {
  data () {
    return {
      show: false,
      id: null,
      comments: []
    }
  },
  mounted () {
    this.id = this.$root.$mp.query.id
    this.getComments()
  },
  onUnload () {
    this.show = false
  },
  methods: {
    async getComments () {
      wx.showNavigationBarLoading()
      let { id } = this
      const comments = await api.getNewsComments(id)
      const parsedComments = JSON.parse(comments.match(/showcomment\((.*)\)/)[1])
      parsedComments.forEach(comment => {
        comment.M.C = unescape(comment.M.C)
        comment.M.N = unescape(comment.M.N)
      })
      this.comments = parsedComments
      wx.hideNavigationBarLoading()
      this.show = true
    }
  }
}
</script>

<style scoped>

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
