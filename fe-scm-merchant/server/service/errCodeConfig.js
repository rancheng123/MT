const common = require('../common/util.js')
const curlFactory = require('../common/curl').create('errCodeConfig')
const Service = require('@fdfe/era-node').Service

class errCodeConfigService extends Service {
  /**
   * post
   * @param path
   * @param params
   * @returns {Promise<*|void>}
   */
  async post (path, params) {
    const ctx = this.ctx
    const url = `${common.getHostMapping('ERRORCODEHOST', this)}${path}`
    return await curlFactory(ctx).post(url, params)
  }
  /**
   * get
   * @param path
   * @param params
   * @returns {Promise<*>}
   */
  async get (path, params) {
    const ctx = this.ctx
    const url = `${common.getHostMapping('ERRORCODEHOST', this)}${path}`
    return await curlFactory(ctx).get(url, params)
  }
  /**
   * 获取系统名称
   * @param params
   * @returns {Promise<*|void>}
   */
  async getSystemNameList (params) {
    return await this.get('/api/errorCode/config/info', params)
  }

  /**
   * 错误码列表
   * @param params
   * @returns {Promise<*|void>}
   */
  async requestErrorCodeInfo (params) {
    return await this.post('/api/errorCode/pageList', params)
  }

  /**
   * 保存err
   * @param params
   * @returns {Promise<*|void>}
   */
  async modifyErrorCodeConfigInfo (params) {
    return await this.post('/api/errorCode/save', params)
  }

  /**
   * 查询调用方
   * @param params
   * @returns {Promise<*|void>}
   */
  async getInvocationList (params) {
    return await this.get('/api/joinerinvocation/query', params)
  }

  /**
   * 新增
   * @param params
   * @returns {Promise<*|void>}
   */
  async addInvocation (params) {
    return await this.post('/api/joinerinvocation/save', params)
  }

  /**
   * 新增
   * @param params
   * @returns {Promise<*|void>}
   */
  async updateInvocation (params) {
    let res = await this.post('/api/joinerinvocation/update', params)
    return res
  }
}

module.exports = errCodeConfigService
