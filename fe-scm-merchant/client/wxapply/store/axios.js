import axios from 'axios'

axios.interceptors.request.use(config => config, err => Promise.reject(err))

axios.interceptors.response.use(response => {
  if (
    response &&
    response.status === 200 &&
    response.data &&
    response.data.code === 200
  ) {
    return response.data.data
  }
  return Promise.reject(response.data)
}, error => {
  return Promise.reject(error.response.data)
})

export default axios
