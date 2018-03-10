import request from './request'

const api = {
  getNewslist: (r) => request(`https://api.ithome.com/json/newslist/news?r=${r}`),
  getNews: (id) => request(`https://api.ithome.com/xml/newscontent/${id}.xml`),
  getRelatedNews: (id) => request(`https://api.ithome.com/json/tags/0350/${id}.json`),
  getSlides: () => request('https://api.ithome.com/xml/slide/slide.xml'),
  getTopics: (r) => request(`https://apiquan.ithome.com/api/post?categoryid=0&type=0&orderTime=${r}&visistCount&pageLength`),
  getTopic: (id) => request(`https://apiquan.ithome.com/api/post/${id}`),
  getTopicComments: (id, last) => request(`https://apiquan.ithome.com/api/reply?postid=${id}&replyidlessthan=${last}`)
}

export default api
