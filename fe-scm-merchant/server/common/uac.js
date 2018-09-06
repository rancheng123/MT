/**
 * UAC相关接口请求封装
 */

let createMTAuthHeaders = require('./basicAuth')
let fetchData = require('./fetchData')

class UAC {
  constructor ({uid}) {
    this.env = process.env.NODE_ENV
    this.uid = uid || ''
    this.uacHost = {
      test: 'http://uac.it.beta.sankuai.com',
      prod: 'http://uac.vip.sankuai.com'
    }
  }

  getUacHost () {
    if (this.env !== 'prod') {
      return this.uacHost['test']
    } else {
      return this.uacHost['prod']
    }
  }

  /**
   * 获取加密后的BA
   */
  getUacBA ({uri, method}) {
    return createMTAuthHeaders({uri, method})
  }

  /**
   * 构造请求
   * @param {} param0
   */
  async requestUacAPI ({uri, method, params = {}}) {
    let self = this
    let BA = this.getUacBA({uri, method})
    return await fetchData({
      method: method,
      url: self.getUacHost() + uri,
      headers: BA,
      data: {
        uid: self.uid,
        ...params
      }
    })
  }

  /**
   * 获取用户能加载的菜单
   */
  async getUserMenus () {
    let uri = '/api/v2/sdk/auth/getUserMenus'
    let method = 'POST'

    return await this.requestUacAPI({uri, method})
  }

  /**
   * 获取用户uri访问权限
   */
  async getAuthUrl (url) {
    let uri = '/api/v2/sdk/auth/authUrl'
    let method = 'POST'
    let params = {
      url: url
    }
    return await this.requestUacAPI({uri, method, params})
  }

  /**
   * 获取用户有权限的资源列表
   */
  async getUserResources () {
    let uri = '/api/v2/sdk/auth/getUserResources'
    let method = 'POST'

    return await this.requestUacAPI({uri, method})
  }

  /**
   * 获取用户拥有的角色
   */
  async getUserRoles () {
    let uri = '/api/v2/sdk/auth/getUserRoles'
    let method = 'POST'

    return await this.requestUacAPI({uri, method})
  }
}

module.exports = UAC
