/**
 *  @file api配置
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-05-07
 **/

'use strict'

const Service = require('@fdfe/era-node').Service
let common = require('../common/util.js')
let Cat = require('../common/catLog.js')
let req = require('../common/request.js')

class BillService extends Service {
  /**
   * 获取商户门店信息
   * @param {} params
   */
  async getShopInfo (params) {
    let self = this
    let catLog = new Cat(self.ctx)

    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/shop/query?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    catLog.addEvent('PC二维码上单-门店信息查询', requestURL, result.data)

    return result.data
  }

  /***
   * 保存商户门店信息
   */
  async saveShopInfo (params) {
    let self = this
    let catLog = new Cat(self.ctx)

    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/shop/save`
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

    catLog.addEvent('PC二维码上单-门店信息保存', requestURL, result.data)

    return result.data
  }

  /***
   * 保存资质信息
   */
  async saveQualificationInfo (params) {
    let self = this
    let catLog = new Cat(self.ctx)
    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/qualification/save`

    if (params && params.from === 'hg') {
      requestURL = `${common.getHostMapping('SCP', self)}/scm/change/qualification`
    }

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

    catLog.addEvent('PC二维码上单-资质信息保存', requestURL, result.data)

    return result.data
  }

  /**
   * 获取行业类目
   * @param {} params
   */
  async getBizUserMccList (params) {
    let self = this
    let queryString = common.paramSerialize(params)

    let requestURL = `${common.getHostMapping('SCP', self)}/scp/shop/suggest/getBizUserMccList?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    return result.data.data
  }

  /**
   * 获取资质信息
   * @param {} params
   */
  async getQualificationInfo (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let catLog = new Cat(self.ctx)

    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/qualification/query?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    catLog.addEvent('PC二维码上单-资质信息查询', requestURL, result.data)

    return result.data
  }

  /**
   * 获取门店账户信息
   * @param {} params
   */
  async getShopAccountInfo (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let catLog = new Cat(self.ctx)

    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/bankCard/getShopCardList?${queryString}`
    let result = await this.ctx.curl(requestURL, req.addHeaders(self.ctx, {dataType: 'json'}))

    catLog.addEvent('PC二维码上单-结算账户信息查询', requestURL, result.data)

    return result.data
  }

  /***
   * 保存银行卡信息
   */
  async saveBankCard (params) {
    let self = this
    let catLog = new Cat(self.ctx)

    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/bankCard/save`
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

    catLog.addEvent('PC二维码上单-结算账户信息保存', requestURL, result.data)

    return result.data
  }

  /***
   * 获取开户行地址
   */
  async getBankList (params) {
    let ctx = this
    const queryString = common.paramSerialize(params)
    const result = await this.ctx.curl(`${common.getHostMapping('SCP', ctx)}/scp/bank/suggest/getBankList?${queryString}`, {dataType: 'json'})

    return result.data.data
  }

  /***
   * 获取开户行支行地址
   */
  async getBankBranchList (params) {
    let ctx = this
    const queryString = common.paramSerialize(params)
    const result = await this.ctx.curl(`${common.getHostMapping('SCP', ctx)}/scp/bank/suggest/getBankBranchList?${queryString}`, {dataType: 'json'})

    return result.data.data
  }

  /***
   * 绑定结算账户
   */
  async bindBankCard (params) {
    let self = this
    let catLog = new Cat(this.ctx)

    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/shop/bindBankCard`
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

    catLog.addEvent('PC二维码上单-绑定结算账户', requestURL, result.data)

    return result.data
  }

  /**
   * 获取结算费率
   * @param {} params
   */
  async getShopRate (params) {
    let self = this
    let catLog = new Cat(self.ctx)

    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/settle/rate/query`
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

    catLog.addEvent('PC二维码上单-费率查询', requestURL, result.data)

    return result.data
  }

  /**
   * 保存结算费率
   * @param {} params
   */
  async saveShopRate (params) {
    let self = this
    let catLog = new Cat(self.ctx)

    let requestURL = `${common.getHostMapping('SCP', self)}/scm/pc/settle/rate/save`
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

    catLog.addEvent('PC二维码上单-费率保存', requestURL, result.data)

    return result.data
  }

  /**
   * 获取到银行卡开户省份
   */
  async getBankProvinceList (params) {
    let ctx = this
    const queryString = common.paramSerialize(params)
    const result = await this.ctx.curl(`${common.getHostMapping('SCP', ctx)}/scp/bank/suggest/getProvinceList?${queryString}`, {dataType: 'json'})

    return result.data.data
  }

  /**
   * 获取到银行卡开户城市
   */
  async getBankCityList (params) {
    let ctx = this
    const queryString = common.paramSerialize(params)
    const result = await this.ctx.curl(`${common.getHostMapping('SCP', ctx)}/scp/bank/suggest/getCityList?${queryString}`, {dataType: 'json'})

    return result.data.data
  }

  /**
   * 查询是否需要清算授权书
   */
  async getNeedSettlePhoto (params) {
    let self = this
    const result = await this.ctx.curl(`${common.getHostMapping('SCP', self)}/scm/pc/bankCard/getNeedSettlePhoto`,
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
   * 商户账号搜索
   * @param {} params
   */
  async searchEcomAccounts (params) {
    let self = this
    const queryString = common.paramSerialize(params)
    const result = await this.ctx.curl(`${common.getHostMapping('SCP', self)}/scp/shop/suggest/searchEcomAccounts?${queryString}`,
      req.addHeaders(self.ctx, {dataType: 'json'})
    )

    return result.data
  }

  /**
   * 查询门店绑定的结算卡
   */
  async queryBindBankCard (params) {
    let self = this
    const queryString = common.paramSerialize(params)
    const result = await this.ctx.curl(`${common.getHostMapping('SCP', self)}/scm/pc/shop/bondBankCard/query?${queryString}`,
      req.addHeaders(self.ctx, {dataType: 'json'})
    )

    return result.data
  }
}

module.exports = BillService
