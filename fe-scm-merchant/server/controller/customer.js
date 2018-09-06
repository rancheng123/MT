/**
 *  @file 客户资质信息
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-07-11
 **/
'use strict'

let {ThriftRequest} = require('../common/thrift')
let {CustomerServiceConfig} = require('../common/globalConfig')
let {TUploadLogMessage} = require('../../thrift/generated/customer_types')
let customerService = require('../../thrift/generated/TCustomerService')

module.exports = common => {
  return class HomeController extends common.EraController {
    /**
     * 获取客户
     */
    async getCustomer () {
      const {
        ctx
      } = this

      let thriftRequest = new ThriftRequest(ctx)
      let result = await thriftRequest.call({
        ...CustomerServiceConfig,
        service: customerService,
        methodName: 'getCustomer',
        params: [123, new TUploadLogMessage({})]
      })

      this.success(result || {})
    }

  }
}
