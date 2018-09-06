/**
 * 对http请求的统一封装
 */
const axios = require('axios')

class HttpRequest {
  constructor (ctx) {
    if (!ctx) {
      throw new Error('请求上下文不能为空')
    }

    this.ctx = ctx
  }
  /**
   * 构造 POST 请求
   * @param {Object} 请求地址／请求参数／自定义请求头
   */
  async post ({ url, data = {}, header = {} }) {
    if (this.ctx) {
      this.printLog({ url, data, header }, 'POST')
      return await this.ctx.curl(url, 
        {
          headers: {
            ...header,
            'Content-Type': 'application/json',
            'userId': this.ctx.userInfo.id
          },
          dataType: 'json',
          method: 'post',
          data: data
        });
    }
  }
  /**
   * 构造 GET 请求
   * @param {Object} 请求地址／请求头 
   */
  async get ({ url, header = {} }) {
    this.printLog({ url, header }, 'GET')
    return await this.ctx.curl(url, 
      {
        headers: {
          'userId': this.ctx.userInfo.id
        },
        dataType: 'json'
      });
  }
  /**
   * 打印日志
   * @param {Object} param0 
   */
  printLog({ url, data, header = {} }, method) {
    let logStr = ''
    let log = {
      requestURL: url,
      method: method,
      params: data ? JSON.stringify(data) : '',
      headers: JSON.stringify(header)
    }
    
    Object.keys(log).forEach(key => {
      logStr += `${ key } = ${ log[key] }，`  
    })

    console.log(' [HTTP_REQUEST_LOG] ' + logStr.replace(/\，$/, ''))
  }
}

module.exports = HttpRequest

