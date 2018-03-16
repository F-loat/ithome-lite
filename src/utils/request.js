import Fly from 'flyio'

const request = new Fly()

request.interceptors.response.use(
  (response, promise) => {
    return response.data
  },
  (err, promise) => {
    console.log(err)
  }
)

export default request
