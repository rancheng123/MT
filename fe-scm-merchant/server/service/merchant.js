/**
 *  @file api配置
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-04-20
 **/

'use strict'

const Service = require('@fdfe/era-node').Service
let common = require('../common/util.js')
let req = require('../common/request.js')

class MerchantService extends Service {
  /**
   * 获取省份列表
   */
  async getProvinceList () {
    const result = await this.ctx.curl(`${common.getHostMapping('SCP')}scp/shop/suggest/getProvinceList`, req.addHeaders(this.ctx, {dataType: 'json'}))

    return result.data.data
  }

  /**
   * 获取城市列表
   */
  async getCityList (params) {
    const result = await this.ctx.curl(`${common.getHostMapping('SCP')}/scp/shop/suggest/getChildLocationList?id=${params.id}`, req.addHeaders(this.ctx, {dataType: 'json'}))

    return result.data.data
  }

  /**
   * 获取门店列表
   * @param {} params
   */
  async getBusinessInfo (params) {
    let self = this
    const result = await this.ctx.curl(`${common.getHostMapping('SCP')}/scp/business/query`,
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

  /**
   * 获取巡检记录
   */
  async getShopCheckInfo (params) {
    const queryString = common.paramSerialize(params)
    const result = await this.ctx.curl(`${common.getHostMapping('SCP')}/scp/business/getVisit?${queryString}`, req.addHeaders(this.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 获取用户角色
   */
  async getUserRole (params) {
    const queryString = common.paramSerialize(params)
    const result = await this.ctx.curl(`${common.getHostMapping('SCP')}/scp/business/getUserRole?${queryString}`, req.addHeaders(this.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 获取产品列表
   */
  async getProductTypeList () {
    const result = await this.ctx.curl(`${common.getHostMapping('SCP')}/scp/shop/query/productTypeList`, req.addHeaders(this.ctx, {dataType: 'json'}))

    return result.data.data
  }

  /**
   * 获取下载信息
   */
  async getDownLoadInfo () {
    const result = await this.ctx.curl(`${common.getHostMapping('SCP')}/scp/business/queryDownLoad`, req.addHeaders(this.ctx, {dataType: 'json'}))

    return result.data.data
  }

  /**
   * 导出信息
   */
  async exportMerchant (params) {
    let self = this
    const result = await this.ctx.curl(`${common.getHostMapping('SCP')}/scp/business/down`,
      {
        headers: {
          'Content-Type': 'application/json',
          'userId': self.ctx.userInfo.id
        },
        dataType: 'json',
        method: 'post',
        data: params
      })
    console.log(result)
    return result.data
  }
}

module.exports = MerchantService
