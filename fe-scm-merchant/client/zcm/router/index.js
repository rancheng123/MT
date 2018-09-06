/**
 * SPA路由配置页面，全部实现懒加载
 */
import Vue from 'vue'
import Router from 'vue-router'

import bdsaleRouter from './bdsale/router'
import merchantRouter from './merchant/router'
import qualification from './qualification/router'
import pageRouter from './pageConfig/router'

let Home = resolve => require(['../pages/layout/Zcm.vue'], resolve)
let NoAuthority = resolve => require(['../pages/layout/NoAuthority.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        storeList: ['common'],
        pathName: '/'
      }
    }, {
      path: '/zcm',
      name: 'Home',
      meta: {
        storeList: ['common'],
        pathName: '/zcm' // 如果是子路由，需配置parent path + children path
      },
      children: [
        ...bdsaleRouter,
        ...merchantRouter,
        ...qualification,
        ...pageRouter
      ],
      component: Home
    }, {
      path: '/zcm/noAuthority',
      name: 'Home',
      meta: {
        storeList: ['common'],
        pathName: '/zcm/noAuthority'
      },
      component: NoAuthority
    }
  ]
})
