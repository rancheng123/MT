/**
 * 上单系统路由映射
 */
module.exports = [
  {
    path: '/h5/merchant/demo',
    ctr: 'merchantSelfService.index',
    method: 'get'
  },
  {
    path: '/h5/merchant/returnMachineDetail',
    ctr: 'merchantSelfService.returnMachineDetail',
    method: 'get'
  },
  {
    path: '/h5/merchant/changeMachineDetail',
    ctr: 'merchantSelfService.changeMachineDetail',
    method: 'get'
  },
  {
    path: '/h5/merchant/returnAndChangeProtocol',
    ctr: 'merchantSelfService.returnAndChangeProtocol',
    method: 'get'
  },
  {
    path: '/h5/merchant/oldMachinePost',
    ctr: 'merchantSelfService.oldMachinePost',
    method: 'get'
  },
  {
    path: '/h5/merchant/machineReplaceBind',
    ctr: 'merchantSelfService.machineReplaceBind',
    method: 'get'
  },
  {
    path: '/h5/merchant/problemTime',
    ctr: 'merchantSelfService.problemTime',
    method: 'get'
  }
]
