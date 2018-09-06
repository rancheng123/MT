const Cat = require('./catLog')
const Request = Symbol.for('#request')

/**
 * Curl
 * @type {module.Curl}
 */
class Curl {
  constructor (ctx, module = 'default') {
    this.ctx = ctx
    this.module = module
  }

  /**
   * __request
   * @param url
   * @param host
   * @param path
   * @param headers
   * @param params
   * @param method
   * @param timeout
   * @returns {Promise<void>}
   * @private
   */
  async [Request] ({url, host, path, headers, params: data, method = 'GET', timeout = 5000}) {
    const catLog = new Cat(this.ctx)
    const module = this.module
    try {
      const _url = url || `${host}${path}`
      const resp = await this.ctx.curl(_url, {
        method,
        timeout,
        data,
        dataAsQueryString: method === 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        dataType: 'json'
      })
      catLog.addEvent(`${module}-request`, _url, resp)
      return resp
    } catch (e) {
      catLog.addError(`${module}-error`, e)
    }
  }

  /**
   * post
   * @param url
   * @param headers
   * @param params
   * @returns {Promise<void>}
   */
  async post ({url, headers, params}) {
    return await this[Request]({url, headers, params, method: 'POST'})
  }

  /**
   * get
   * @param url
   * @param headers
   * @param params
   * @returns {Promise<void>}
   */
  async get ({url, headers, params}) {
    return await this[Request]({url, headers, params, method: 'GET'})
  }
}

/**
 * create
 * @param module
 * @returns {function(*=): {get(*, *): Promise<*>, post(*, *): Promise<*>}}
 */
Curl.create = function (module) {
  /**
   * factory for curl
   */
  return function (ctx) {
    /**
     * curl instance
     * @type {Curl}
     */
    const curl = new Curl(ctx, module)

    /**
     * request
     * @param method
     * @param url
     * @param params
     * @returns {Promise<*>}
     */
    async function request ({method = 'get', url, params}) {
      // 从ctx中，获取用户id，并将其写入header
      const userId = ctx.userInfo.id

      // 根据不同的type，执行不同的method
      const resp = await curl[method]({url, params, headers: {userId}})

      // 当接口数据错误时，抛出异常
      if (!(resp && resp.status === 200)) {
        throw new Error(resp ? resp.msg : 'unknown error.')
      }

      // 返回data数据
      return resp.data
    }
    return {
      /**
       * get
       * @param url
       * @param params
       * @returns {Promise<*>}
       */
      async get (url, params) {
        return await request({url, params})
      },
      /**
       * post
       * @param url
       * @param params
       * @returns {Promise<*>}
       */
      async post (url, params) {
        return await request({method: 'post', url, params})
      }
    }
  }
}

module.exports = Curl
