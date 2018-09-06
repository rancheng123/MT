/**
 *  @file api配置
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-06-05
 **/

'use strict'

const Service = require('@fdfe/era-node').Service
let common = require('../common/util.js')
let req = require('../common/request.js')

class CommonService extends Service {
  /**
   * 获取配置页面数据统一入口
   * method: get
   */
  async getPageDataSource (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping(params.hostType, self)}${params.requestUrl}?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 获取配置页面数据统一入口
   * method: post
   */
  async postPageDataSource (params) {
    let self = this
    let requestURL = `${common.getHostMapping(params.hostType, self)}${params.requestUrl}`
    let result = await this.ctx.curl(requestURL,
      {
        headers: {
          'Content-Type': 'application/json',
          'userId': self.ctx.userInfo.id
        },
        dataType: 'json',
        method: 'post',
        data: params
      })
    return result.data
  }
}

module.exports = CommonService
