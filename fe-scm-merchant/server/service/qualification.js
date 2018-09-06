/**
 *  @file api配置
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-07-16
 **/

'use strict';

const Service = require('@fdfe/era-node').Service;
let common = require('../common/util.js');
let req = require('../common/request.js');
let Cat = require('../common/catLog.js');
let { ThriftRequest } = require('../common/thrift')
let { CustomerServiceConfig, CustomerAuditServiceConfig } = require('../common/globalConfig')
let { TUploadLogMessage } = require('../../thrift/generated/commons_types')
let { TSaveAuditReqDTO, TAuditResultDTO } = require('../../thrift/generated/customeraudit_types')
let customerService = require('../../thrift/generated/TCustomerService')
let customerAuditService = require('../../thrift/generated/TCustomerAuditService')
let { TCustomerDTO, TCompanyQualification, TPersonalQualification, TAuthenticationMessage } = require('../../thrift/generated/customer_types.js')

let customerServiceList = [
  {
    ip: '10.21.164.130',
    port: 8901
  }
]

class QualificationService extends Service {

  /**
   * 获取客户信息
   * method: GET
   */
  async getCustomerWithAuth(params) {
   
    let thriftRequest = new ThriftRequest(this.ctx)
    let result = await thriftRequest.call({
      ...CustomerServiceConfig,
      serviceList: customerServiceList,
      service: customerService,
      methodName: 'getCustomerWithAuth',
      params: [+params.customerId, new TUploadLogMessage({})]
    })

    return result.data;
  }

  /**
   * 预读接口
   * method: GET
   */
  async preFillCustomerWithAuth(params) {
    let thriftRequest = new ThriftRequest(this.ctx)
    let result = await thriftRequest.call({
      ...CustomerServiceConfig,
      service: customerService,
      serviceList: customerServiceList,
      methodName: 'preFillCustomerWithAuth',
      params: [params.qualCode, new TUploadLogMessage({})]
    })

    return result.data;
  }

  /**
   * 提交审核
   * method: GET
   */
  async submitAudit(params) {
    let thriftRequest = new ThriftRequest(this.ctx)
    let result = await thriftRequest.call({
      ...CustomerServiceConfig,
      service: customerService,
      methodName: 'submitAudit',
      params: [+params.customerId, this.ctx.userInfo.id, 1]
    })

    return result;
  }

  /**
   * 保存客户信息
   * method: POST
   */
  async saveCustomerWithAuth(params) {
  
    let thriftRequest = new ThriftRequest(this.ctx)
    let cq = params.companyQualification
    let pq = params.personalQualification
    let am = params.authenticationMessage

    params.companyQualification = cq ? new TCompanyQualification(cq) : null
    params.personalQualification = pq ? new TPersonalQualification(pq) : null
    params.authenticationMessage = am ? new TAuthenticationMessage(am): null
    params.type = +params.type
    params.id = +params.id

    let customer = new TCustomerDTO(params)

    let result = await thriftRequest.call({
      ...CustomerServiceConfig,
      service: customerService,
      serviceList: customerServiceList,
      methodName: 'saveCustomerWithAuth',
      params: [customer, this.ctx.userInfo.id, 1, (+params.shopId || ''), new TUploadLogMessage({})]
    })

    return result;
  }

  /**
   * 审核详情获取
   * method: get
   */
  async queryAudit(params) {
    let thriftRequest = new ThriftRequest(this.ctx)
    let catLog = new Cat(this.ctx)
    let result = await thriftRequest.call({
      ...CustomerAuditServiceConfig,
      service: customerAuditService,
      methodName: 'queryAudit',
      params: [params.auditFlowId]
    })
    catLog.addEvent('审核详情获取', params.auditFlowId, result)
    return result;
  }

  /**
   * 审核驳回原因获取
   * method: get
   */
  async queryReason(params) {
    let thriftRequest = new ThriftRequest(this.ctx)
    let catLog = new Cat(this.ctx)
    let result = await thriftRequest.call({
      ...CustomerAuditServiceConfig,
      service: customerAuditService,
      methodName: 'queryReason',
      params: [params.attrId]
    })
    catLog.addEvent('审核驳回原因获取', params.attrId, result)
    return result.data;
  }

  /**
   * 存储审核驳回信息
   * method: post
   */
  async saveAudit(params) {
    let thriftRequest = new ThriftRequest(this.ctx)
    let tr = params.items
    let items = []
    tr.forEach(function(element) {
      items.push(new TAuditResultDTO(element))
    });
    params.items = items
    let result = await thriftRequest.call({
      ...CustomerAuditServiceConfig,
      service: customerAuditService,
      methodName: 'saveAudit',
      params: [new TSaveAuditReqDTO(params)]
    })
    return result;
  }

}

module.exports = QualificationService;
