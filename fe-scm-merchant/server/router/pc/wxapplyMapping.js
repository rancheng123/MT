/**
 * 上单系统路由映射
 */
module.exports = [
  {
    path: '/wxapply/index',
    ctr: 'wxapply.index',
    method: 'get'
  },
  {
    path: '/wxapply/list',
    ctr: 'wxapply.list',
    method: 'get'
  },
  {
    path: '/wxapply/getApplyList',
    ctr: 'wxapply.getApplyList',
    method: 'get'
  },
  {
    path: '/wxapply/download',
    ctr: 'wxapply.download',
    method: 'get'
  },
  {
    path: '/wxapply/submit',
    ctr: 'wxapply.submit',
    method: 'post'
  },
  {
    path: '/wxapply/audit',
    ctr: 'wxapply.audit',
    method: 'post'
  },
  {
    path: '/wxapply/suggest',
    ctr: 'wxapply.suggest',
    method: 'get'
  }
]
