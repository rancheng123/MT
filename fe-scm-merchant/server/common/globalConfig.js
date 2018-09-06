/**
 * 项目appKey
 */
const APPKEY = 'com.sankuai.zc.fe.merchant'
/**
 * CustomerService 配置
 */
const CustomerService = {
  serviceName: 'com.sankuai.meituan.zcm.camaro.thrift.customer.TCustomerService',
  remoteAppKey: 'com.sankuai.zc.cos.camaro'
}
/**
 * CustomerAuditService 配置
 */
const CustomerAuditService = {
  serviceName: 'com.sankuai.meituan.zcm.camaro.thrift.customeraudit.TCustomerAuditService',
  remoteAppKey: 'com.sankuai.zc.cos.customeradmin'
}

module.exports = {
  APPKEY: APPKEY,
  CustomerServiceConfig: CustomerService,
  CustomerAuditServiceConfig: CustomerAuditService
}
