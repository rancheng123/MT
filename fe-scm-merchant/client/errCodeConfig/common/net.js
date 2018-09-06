import axios from 'axios'

export default function (Notify) {
  axios.interceptors.response.use(
    res => {
      // Vue.$vux.loading.hide()
      if (res && res.status === 200) {
        // console.log('res/data', res)
        return res.data || {}
      } else {
        Notify({
          title: '错误',
          message: res.message || '接口错误',
          position: 'top-left'
        })
      }
    },
    err => {
      // Vue.$vux.loading.hide()
      Promise.reject(err)
      console.log(this)
      Notify({
        title: '错误',
        message: '后台错误！',
        position: 'top-left'
      })
    }
  )
  return axios
}
// axios.interceptors.request.use(
//   config => {
//     Vue.$vux.loading.show({
//       text: '加载中...'
//     })
//     return config
//   },
//   err => {
//     Vue.$vux.loading.hide()

//     Vue.$vux.toast.show({
//       type: 'text',
//       text: '网络错误!',
//       position: 'bottom'
//     })
//     Promise.reject(err)
//   }
// )

// axios.interceptors.response.use(
//   res => {
//     // Vue.$vux.loading.hide()
//     if (res && res.status === 200 && res.data.status === 200) {
//       return res.data.data || {}
//     } else {
//       console.log('this', Vue)

//       /* eslint-disable */
//       debugger
//       /* eslint-disable */

//       Vue.$notify({
//         title: '错误',
//         message: res.message || res.data.errMsg || '接口错误',
//         position: 'top-left'
//       })
//     }
//   },
//   err => {
//     // Vue.$vux.loading.hide()
//     Promise.reject(err)
//     console.log(this)
//     Vue.$notify({
//       title: '错误',
//       message: '后台错误！',
//       position: 'top-left'
//     })
//   }
// )
