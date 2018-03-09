const request = (url, method = 'GET') => new Promise((resolve, reject) => {
  wx.request({
    url,
    method,
    success: res => resolve(res.data),
    fail: res => reject(res)
  })
})

export default request
