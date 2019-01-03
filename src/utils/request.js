import Fly from 'flyio'

const request = new Fly()

request.interceptors.request.use((request) => {
  uni.showNavigationBarLoading()
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    uni.hideNavigationBarLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    uni.hideNavigationBarLoading()
    uni.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
