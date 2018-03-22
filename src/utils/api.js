import request from './request'

const api = {
  getNewslist: (r) => request.get('/api/json/newslist/news', { r }),
  getNews: (id) => request.get(`/api/xml/newscontent/${id}.xml`),
  getRelatedNews: (id) => request.get(`/api/json/tags/0${id.slice(0, 3)}/${id}.json`, null, {
    parseJson: false
  }),
  getNewsComments: (id) => request.get(`/dyn/json/commentlist/350/87a8e5b144d81938.json`),
  getSlides: () => request.get('/api/xml/slide/slide.xml'),
  getTopics: (r) => request.get('/apiquan/api/post', {
    categoryid: 0,
    type: 0,
    orderTime: r,
    visistCount: '',
    pageLength: ''
  }),
  getTopic: (id) => request.get(`/apiquan/api/post/${id}`),
  getTopicComments: (id, last) => request.get('/apiquan/api/reply', {
    postid: id,
    replyidlessthan: last
  })
}

export default api
