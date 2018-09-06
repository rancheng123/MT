/**
 * SPA路由配置页面，全部实现懒加载
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let Demo = resolve => require(['../pages/demo'], resolve)
//  退机详情
let returnMachineDetail = resolve => require(['../pages/returnMachineDetail'], resolve)
//  换机详情
let changeMachineDetail = resolve => require(['../pages/changeMachineDetail'], resolve)
// 退换机协议
let returnAndChangeProtocol = resolve => require(['../pages/returnAndChangeProtocol'], resolve)
// 旧机邮寄
let oldMachinePost = resolve => require(['../pages/oldMachinePost'], resolve)
// 设备换绑
let machineReplaceBind = resolve => require(['../pages/machineReplaceBind'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/h5/merchant/demo',
      name: 'Demo',
      children: [
      ],
      component: Demo
    },
    {
      path: '/h5/merchant/returnMachineDetail',
      name: 'returnMachineDetail',
      children: [
      ],
      component: returnMachineDetail
    },
    {
      path: '/h5/merchant/changeMachineDetail',
      name: 'changeMachineDetail',
      children: [
      ],
      component: changeMachineDetail
    },
    {
      path: '/h5/merchant/returnAndChangeProtocol',
      name: 'returnAndChangeProtocol',
      children: [
      ],
      component: returnAndChangeProtocol
    },
    {
      path: '/h5/merchant/oldMachinePost',
      name: 'oldMachinePost',
      children: [
      ],
      component: oldMachinePost
    },
    {
      path: '/h5/merchant/machineReplaceBind',
      name: 'machineReplaceBind',
      children: [
      ],
      component: machineReplaceBind
    }
  ]
})
