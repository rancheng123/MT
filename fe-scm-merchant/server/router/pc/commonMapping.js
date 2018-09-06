/**
 * 公共接口路由映射
 */
module.exports = [
  {
    path: '/common/postPageDataSource',
    ctr: 'common.postPageDataSource',
    method: 'post'
  },
  {
    path: '/common/getPageDataSource',
    ctr: 'common.getPageDataSource',
    method: 'get'
  }, {
    path: '/common/getMtConfig',
    ctr: 'common.getMtConfig',
    method: 'get'
  }, {
    path: '/common/setMtConfig',
    ctr: 'common.setMtConfig',
    method: 'post'
  }, {
    path: '/common/getAuthUrl',
    ctr: 'common.getAuthUrl',
    method: 'post'
  }
]
