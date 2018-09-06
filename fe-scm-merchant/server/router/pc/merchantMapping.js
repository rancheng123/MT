/**
 * 商户信息系统路由映射
 */
module.exports = [
  {
    path: '/merchant/list',
    ctr: 'merchant.index',
    method: 'get'
  },
  {
    path: '/merchant/inspection',
    ctr: 'merchant.inspection',
    method: 'get'
  },
  {
    path: '/getProvinceList',
    ctr: 'merchant.getProvinceList',
    method: 'get'
  },
  {
    path: '/getCityList',
    ctr: 'merchant.getCityList',
    method: 'get'
  },
  {
    path: '/getBusinessInfo',
    ctr: 'merchant.getBusinessInfo',
    method: 'get'
  },
  {
    path: '/getShopCheckInfo',
    ctr: 'merchant.getShopCheckInfo',
    method: 'get'
  },
  {
    path: '/merchant/getUserRole',
    ctr: 'merchant.getUserRole',
    method: 'get'
  },
  {
    path: '/getProductTypeList',
    ctr: 'merchant.getProductTypeList',
    method: 'get'
  },
  {
    path: '/merchant/getDownLoadInfo',
    ctr: 'merchant.getDownLoadInfo',
    method: 'get'
  },
  {
    path: '/merchant/exportMerchant',
    ctr: 'merchant.exportMerchant',
    method: 'get'
  }
]