/**
 * 异步请求封装
 */
let axios = require('axios')
let { Cookie, Host, userId } = require('./config')

// 异步接口封装
exports.fetchData = async function (params) {
  if (params && params.url) {
    if (params.url.indexOf('http://') ||
      params.url.indexOf('https://')) {
      params.url = Host + params.url
    }
  }

  params.headers = {}
  params.headers['Cookie'] = Cookie
  params.headers['userId'] = userId

  return await axios(params)
}

// 对象参数序列化
exports.paramSerialize = function (params) {
  let queryString = ''
  if (params) {
    for (let p in params) {
      if (params.hasOwnProperty(p)) {
        if (params[p]) {
          queryString = `${queryString}${p}=${params[p]}&`
        }
      }
    }
  }
  return queryString.replace(/&$/, '')
}
