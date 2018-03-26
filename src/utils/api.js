import request from './request'

const api = {
  getNewsList: (r) => request.get('https://api.ithome.com/json/newslist/news'),
  getNews: (id) => request.get(`https://api.ithome.com/xml/newscontent/${id}.xml`),
  getRelatedNews: (id) => request.get(`https://api.ithome.com/json/tags/0${id.slice(0, 3)}/${id}.json`, null, {
    parseJson: false
  }),
  getNewsComments: (id) => request.get(`https://dyn.ithome.com/json/commentlist/350/87a8e5b144d81938.json`),
  getSlides: () => request.get('https://api.ithome.com/xml/slide/slide.xml'),
  getTopics: (r) => request.get('https://apiquan.ithome.com/api/post', {
    categoryid: 0,
    type: 0,
    orderTime: r,
    visistCount: '',
    pageLength: ''
  }),
  getTopic: (id) => request.get(`https://apiquan.ithome.com/api/post/${id}`),
  getTopicComments: (id, last) => request.get('https://apiquan.ithome.com/api/reply', {
    postid: id,
    replyidlessthan: last
  })
}

export default api
