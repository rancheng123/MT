/**
 *  @file server路由配置
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-04-20
 **/

'use strict';
/**
 * pc端路由配置
 */
let qualificationMap = require('./router/pc/qualificationMapping')
let merchantMap = require('./router/pc/merchantMapping')
let billMap = require('./router/pc/billMapping')
let bdsaleMap = require('./router/pc/bdsaleMapping')
let commonMap = require('./router/pc/commonMapping')
let errCodeMap = require('./router/pc/errCodeConfigMapping')
let wxapplyMap = require('./router/pc/wxapplyMapping')
/**
 * 移动端路由配置
 */
let merchantSelfServiceMapping = require('./router/mobile/merchantSelfServiceMapping')

let routerRegister = (router, routerMap) => {
  if (routerMap) {
    routerMap.forEach(item => {
      if (item.method && item.method === 'post') {
        router.post(item.path, item.ctr)
      } else {
        router.get(item.path, item.ctr)
      }
    })
  }
}

module.exports = app => {
  const {router} = app

  /**
   *  所有路由容器,以/zcm开头的路由map都放到最前面
   */
  let allRouters = [
    ...qualificationMap,
    ...merchantMap,
    ...billMap,
    ...bdsaleMap,
    ...commonMap,
    ...wxapplyMap,
    ...merchantSelfServiceMapping,
    ...errCodeMap
  ]

  routerRegister(router, allRouters)
}
