<template lang="pug">
.container
  .header
    h1.news-title {{title}}
    .auth-info {{news.newssource}}({{news.newsauthor}})
  .news-content(v-html="news.detail")
  h2.related-title(v-if="relatedNews.length") 相关文章
  .news-wrap
    news-item(
      v-for="news of relatedNews",
      :news="news"
      :key="news.newsid")
  //- .comment-btn(@click="turnToComment")
  //-   img.comment-icon(src="/static/assets/comment.png")
</template>

<script>
import xml2json from 'xmlstring2json'
import api from '@/utils/api'
import newsItem from '@/components/news-item'

const dataArr = []

export default {
  components: {
    newsItem
  },
  data () {
    return {
      id: null,
      title: '',
      news: {},
      relatedNews: []
    }
  },
  async mounted () {
    Object.assign(this.$data, this.$options.data())
    this.id = this.$route.query.id
    this.title = this.$route.query.title
    await Promise.all([
      this.getNews(),
      this.getRelatedNews()
    ])
    dataArr.push({ ...this.$data })
  },
  onUnload () {
    dataArr.pop()
    const dataNum = dataArr.length
    if (!dataNum) return
    Object.assign(this.$data, dataArr[dataNum - 1])
  },
  methods: {
    turnToComment () {
      this.$router.push({
        path: '/pages/news/comment',
        query: {
          id: this.id
        }
      })
    },
    async getNews () {
      let { id } = this
      id = `${id.slice(0, 3)}/${id.slice(3, 6)}`
      const news = await api.getNews(id)
      if (!news) return
      const parsedNews = xml2json(news).rss.channel.item
      this.news = {
        newssource: parsedNews.newssource['#text'],
        detail: parsedNews.detail['#text'].replace(/<img/g, '<img width="100%"'),
        newsauthor: parsedNews.newsauthor['#text']
      }
    },
    async getRelatedNews () {
      const newslist = await api.getRelatedNews(this.id)
      if (!newslist) return
      const parsedNews = JSON.parse(newslist.replace('var tag_jsonp =', ''))
      this.relatedNews = parsedNews.slice(0, 3).map(news => {
        return {
          title: news.newstitle,
          image: news.img,
          link: `/pages/news/detail?id=${news.newsid}&title=${news.newstitle}`,
          postdate: news.postdate
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url("~@/styles/index.less");

.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #fff;
  background-color: @primary-color;
  padding: 10px;
  box-sizing: border-box;
}
.news-title {
  font-size: 22px;
}
.auth-info {
  font-size: 12px;
  margin-top: 10px;
  align-self: flex-end;
}
.news-content {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  line-height: 1.6;
}

.related-title {
  font-size: 18px;
  font-weight: 600;
  align-self: flex-start;
  border-left: 4px solid @primary-color;
  padding: 2px 5px;
}

.news-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}

.comment-btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: @primary-color;
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comment-icon {
  width: 40px;
  height: 40px;
}
</style>
