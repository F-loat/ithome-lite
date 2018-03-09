import request from './request'

const api = {
  getNewslist: (r) => request(`https://api.ithome.com/json/newslist/news?r=${r}`),
  getNews: (id) => request(`https://api.ithome.com/xml/newscontent/${id}.xml`),
  getRelatedNews: (id) => request(`https://api.ithome.com/json/tags/0350/${id}.json`),
  getSlides: () => request('https://api.ithome.com/xml/slide/slide.xml')
}

export default api
