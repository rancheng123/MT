/**
 * 客户资质路由映射
 */
module.exports = [
    {
      path: '/zcm/qualification/getCustomerWithAuth',
      ctr: 'qualification.getCustomerWithAuth',
      method: 'get'
    }, {
      path: '/zcm/qualification/saveCustomerWithAuth',
      ctr: 'qualification.saveCustomerWithAuth',
      method: 'post'
    }, {
      path: '/zcm/qualification/queryAudit',
      ctr: 'qualification.queryAudit',
      method: 'get'
    }, {
      path: '/zcm/qualification/queryReason',
      ctr: 'qualification.queryReason',
      method: 'get'
    }, {
      path: '/zcm/qualification/preFillCustomerWithAuth',
      ctr: 'qualification.preFillCustomerWithAuth',
      method: 'get'
    }, {
      path: '/zcm/qualification/submitAudit',
      ctr: 'qualification.submitAudit',
      method: 'post'
    }, {
      path: '/zcm/qualification/saveAudit',
      ctr: 'qualification.saveAudit',
      method: 'post'
    }
  ]