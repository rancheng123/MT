/**
 * 错误码路由映射
 */
module.exports = [
  {
    path: '/mis/errCodeConfig/list',
    ctr: 'errCodeConfig.list',
    method: 'get'
  },
  {
    path: '/mis/errCodeConfig/invocation',
    ctr: 'errCodeConfig.list',
    method: 'get'
  },
  {
    path: '/errCodeConfig/getSystemNameList',
    ctr: 'errCodeConfig.getSystemNameList',
    method: 'get'
  },
  {
    path: '/errCodeConfig/requestErrorCodeInfo',
    ctr: 'errCodeConfig.requestErrorCodeInfo',
    method: 'post'
  },
  {
    path: '/errCodeConfig/modifyErrorCodeConfigInfo',
    ctr: 'errCodeConfig.modifyErrorCodeConfigInfo',
    method: 'post'
  },
  {
    path: '/errCodeConfig/getInvocationList',
    ctr: 'errCodeConfig.getInvocationList',
    method: 'get'
  },
  {
    path: '/errCodeConfig/addInvocation',
    ctr: 'errCodeConfig.addInvocation',
    method: 'post'
  },
  {
    path: '/errCodeConfig/updateInvocation',
    ctr: 'errCodeConfig.updateInvocation',
    method: 'post'
  },
  {
    path: '/mis/home',
    ctr: 'errCodeConfig.home',
    method: 'get'
  }
]
