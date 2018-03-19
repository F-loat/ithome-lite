import Fly from 'flyio'

const request = new Fly()

request.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    return response.data
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    console.log(err)
  }
)

export default request
