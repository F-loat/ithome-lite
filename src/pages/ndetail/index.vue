<template lang="pug">
.container(v-show="show")
  .header
    h1.news-title {{title}}
    .auth-info {{news.newssource}}({{news.newsauthor}})
  rich-text.news-content(:nodes="news.detail")
  h2.related-title(v-if="relatedNews.length") 相关文章
  .news-wrap
    a.news-item(
      :href="news.link",
      v-for="news of relatedNews",
      :key="news.newsid",
      v-if="!news.lapinid")
      img.news-img(:src="news.image", mode="aspectFill")
      .news-text
        .news-title {{news.title}}
        .news-info
          text {{news.postdate}}
          text(v-if="news.commentcount") {{news.commentcount}}评
</template>

<script>
import xml2json from 'xmlstring2json'
import api from '@/utils/api'

export default {
  data () {
    return {
      show: false,
      id: null,
      title: '',
      news: {},
      relatedNews: []
    }
  },
  mounted () {
    this.id = this.$root.$mp.query.id
    this.title = this.$root.$mp.query.title
    this.getNews()
    this.getRelatedNews()
  },
  onUnload () {
    this.show = false;
  },
  methods: {
    async getNews () {
      let { id } = this
      id = `${id.slice(0, 3)}/${id.slice(3, 6)}`
      const news = await api.getNews(id)
      const parsedNews = xml2json(news).rss.channel.item
      this.news = {
        newssource: parsedNews.newssource['#text'],
        detail: parsedNews.detail['#text'].replace(/<img/g, '<img width="100%"'),
        newsauthor: parsedNews.newsauthor['#text']
      }
      this.show = true;
    },
    async getRelatedNews () {
      const newslist = await api.getRelatedNews(this.id)
      const parsedNews = JSON.parse(newslist.replace('var tag_jsonp =', ''))
      this.relatedNews = parsedNews.map(news => {
        return {
          title: news.newstitle,
          image: news.img,
          link: `/pages/ndetail/ndetail?id=${news.newsid}&title=${news.newstitle}`,
          postdate: news.postdate
        }
      })
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #fff;
  background-color: #d22222;
  padding: 10px;
  box-sizing: border-box;
}
.news-title {
  font-size: 20px;
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
  line-height: 1.5;
}

.related-title {
  font-size: 18px;
  font-weight: 600;
  align-self: flex-start;
  border-left: 4px solid #d22222;
  padding: 2px 5px;
}

.news-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.news-item {
  display: flex;
  height: 90px;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.news-img {
  width: 100px;
  height: 75px;
  margin-right: 10px;
}
.news-text {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.news-title {
  font-size: 15px;
}
.news-info {
  color: #aaa;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
