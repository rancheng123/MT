/**
 * @file 统一封装异步请求
 */
/* eslint-disable */
import axios from 'axios'
import "babel-polyfill"

export default async function fetchData (params) {
  /**
   * 这步操作防止era框架报403错误，axios post默认是FormData方式提交
   */
  params = params || {}
  if (!params.hasOwnProperty('headers')) {
    params['headers'] = {}  
  }

  params.headers['Content-Type'] = 'application/json;charset=UTF-8'
  /**
   * 标示这个请求是Ajax
   */
  params.headers['X-Requested-With'] = 'XMLHttpRequest'

  return await axios(params)
}

