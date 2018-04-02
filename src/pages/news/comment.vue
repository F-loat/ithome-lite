<template lang="pug">
.container(v-show="show")
  .comment-wrap
    comment-item(
      v-for="comment of comments",
      :key="comment.id",
      :comment="comment")
</template>

<script>
import api from '@/utils/api'
import { formatComment } from '@/utils'
import commentItem from '@/components/comment-item'

export default {
  components: {
    commentItem
  },
  data () {
    return {
      show: false,
      id: null,
      comments: []
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getComments()
  },
  onUnload () {
    this.show = false
  },
  methods: {
    async getComments () {
      let { id } = this
      const comments = await api.getNewsComments(id)
      if (!comments) return
      const parsedComments = JSON.parse(comments.match(/showcomment\((.*)\)/)[1])
      this.comments = parsedComments.map(comment => {
        comment.M.C = unescape(comment.M.C)
        comment.M.N = unescape(comment.M.N)
        return formatComment(comment)
      })
      this.show = true
    }
  }
}
</script>

<style lang="less">
</style>
