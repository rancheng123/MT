/**
 * 上单系统路由映射
 */
module.exports = [
  {
    path: '/bill/qrcode',
    ctr: 'bill.index',
    method: 'get'
  },
  {
    path: '/bill/qrcode/*',
    ctr: 'bill.index',
    method: 'get'
  }, {
    path: '/getShopInfo',
    ctr: 'bill.getShopInfo',
    method: 'get'
  }, {
    path: '/saveShopInfo',
    ctr: 'bill.saveShopInfo',
    method: 'post'
  }, {
    path: '/getBizUserMccList',
    ctr: 'bill.getBizUserMccList',
    method: 'get'
  }, {
    path: '/saveQualificationInfo',
    ctr: 'bill.saveQualificationInfo',
    method: 'post'
  }, {
    path: '/getQualificationInfo',
    ctr: 'bill.getQualificationInfo',
    method: 'get'
  }, {
    path: '/getShopAccountInfo',
    ctr: 'bill.getShopAccountInfo',
    method: 'get'
  }, {
    path: '/saveBankCard',
    ctr: 'bill.saveBankCard',
    method: 'post'
  }, {
    path: '/getBankList',
    ctr: 'bill.getBankList',
    method: 'get'
  }, {
    path: '/getBankBranchList',
    ctr: 'bill.getBankBranchList',
    method: 'get'
  }, {
    path: '/bindBankCard',
    ctr: 'bill.bindBankCard',
    method: 'post'
  }, {
    path: '/getShopRate',
    ctr: 'bill.getShopRate',
    method: 'post'
  }, {
    path: '/saveShopRate',
    ctr: 'bill.saveShopRate',
    method: 'post'
  }, {
    path: '/getBankProvinceList',
    ctr: 'bill.getBankProvinceList',
    method: 'get'
  }, {
    path: '/getBankCityList',
    ctr: 'bill.getBankCityList',
    method: 'get'
  }, {
    path: '/getNeedSettlePhoto',
    ctr: 'bill.getNeedSettlePhoto',
    method: 'post'
  }, {
    path: '/searchEcomAccounts',
    ctr: 'bill.searchEcomAccounts',
    method: 'get'
  }, {
    path: '/queryBindBankCard',
    ctr: 'bill.queryBindBankCard',
    method: 'get'
  }
]
