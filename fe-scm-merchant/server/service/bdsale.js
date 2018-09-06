/**
 *  @file api配置
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-05-16
 **/

'use strict'

const Service = require('@fdfe/era-node').Service;
let common = require('../common/util');
let Cat = require('../common/catLog');
let req = require('../common/request');
let HttpRequest = require('../common/HttpRequest')

class BdsaleService extends Service {
  /**
   * 获取设备编辑列表
   * @param {} params
   */
  async deviceAuditList (params) {
    let self = this
    let catLog = new Cat(self.ctx)

    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/list/info?${queryString}`
    let result = await new HttpRequest(self.ctx).get(
      {
        url: requestURL
      }
    )

    catLog.addEvent('PC运营售后-设备信息查询', requestURL, result.data)

    return result.data
  }

  /**
   * 获取退换货原因
   * @param {} params
   */
  async getReasonList (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/reasonList/usefull/list/v1?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 获取故障时间
   */
  async getProblemTime (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/problemTime/usefull/list?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 撤换机预读接口
   */
  async getApplyPreData (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/v1/preData?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 退机申请
   */
  async recallApply (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/new/refund/apply`
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

  /**
   * 换机申请
   */
  async exchangeApply (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/new/exchange/apply`
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

  /**
   * 换机申请
   */
  async applyPreCheck (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/apply/preCheck`
    let result = await new HttpRequest(self.ctx).post(
      {
        url: requestURL,
        data: params
      }
    )
    return result.data
  }

  /**
   * 换绑弹窗预读接口
   */
  async bindChangePreData (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/change/bind/preData?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 发货预读接口
   */
  async deliverGoodsPreData (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/post/device/preData?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 申请进度查询
   */
  async processQuery (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/process/query?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 申请日志查询
   */
  async logQuery (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/log/query?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 换机申请详情
   */
  async getExchangeApplyDetail (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/exchange/detail/query?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 换机申请
   */
  async bindChange (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/changeBind`
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

  /**
   * 发货
   */
  async postDevice (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('POS', self)}/japi/pos/handle/post/device`
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

  /**
   * 回收快递单号
   */
  async trackInfo (params) {
    let self = this
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/record/trackInfo`
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

  /**
   * 门店退款账户查询
   */
  async bankInfo (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/shop/bankInfo?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 获取特殊业务列表
   */
  async specialRecallList (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/scene/query?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 配送方式
   */
  async getMailType (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/mail/type?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }

  /**
   * 配送方式
   */
  async getExpressList (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/mail/company?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data
  }
}

module.exports = BdsaleService
