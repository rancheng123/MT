/**
 * 运营售后管理系统
 */
module.exports = [
  {
    path: '/zcm/bdsale/getExpressList',
    ctr: 'bdsale.getExpressList',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/getMailType',
    ctr: 'bdsale.getMailType',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/postDevice',
    ctr: 'bdsale.postDevice',
    method: 'post'
  },
  {
    path: '/zcm/bdsale/deliverGoodsPreData',
    ctr: 'bdsale.deliverGoodsPreData',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/specialRecallList',
    ctr: 'bdsale.specialRecallList',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/bankInfo',
    ctr: 'bdsale.bankInfo',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/trackInfo',
    ctr: 'bdsale.trackInfo',
    method: 'post'
  },
  {
    path: '/zcm/bdsale/getExchangeApplyDetail',
    ctr: 'bdsale.getExchangeApplyDetail',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/getProblemTime',
    ctr: 'bdsale.getProblemTime',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/logQuery',
    ctr: 'bdsale.logQuery',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/processQuery',
    ctr: 'bdsale.processQuery',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/bindChange',
    ctr: 'bdsale.bindChange',
    method: 'post'
  },
  {
    path: '/zcm/bdsale/bindChangePreData',
    ctr: 'bdsale.bindChangePreData',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/applyPreCheck',
    ctr: 'bdsale.applyPreCheck',
    method: 'post'
  },
  {
    path: '/zcm/bdsale/exchangeApply',
    ctr: 'bdsale.exchangeApply',
    method: 'post'
  },
  {
    path: '/zcm/bdsale/recallApply',
    ctr: 'bdsale.recallApply',
    method: 'post'
  },
  {
    path: '/zcm/bdsale/getApplyPreData',
    ctr: 'bdsale.getApplyPreData',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/getReasonList',
    ctr: 'bdsale.getReasonList',
    method: 'get'
  },
  {
    path: '/zcm/bdsale/deviceAuditList',
    ctr: 'bdsale.deviceAuditList',
    method: 'get'
  }, {
    path: '/zcm/*',
    ctr: 'bdsale.index',
    method: 'get'
  }, {
    path: '/zcm',
    ctr: 'bdsale.index',
    method: 'get'
  }, {
    path: '/japi/*',
    ctr: 'bdsale.index',
    method: 'get'
  }
]
