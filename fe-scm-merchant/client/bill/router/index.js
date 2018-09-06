/**
 * SPA路由配置页面，全部实现懒加载
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let ShopInfo = resolve => require(['../components/shopinfo.vue'], resolve)
let Home = resolve => require(['../pages/Index'], resolve)
let Shopqfc = resolve => require(['../components/shopqfc.vue'], resolve)
let Rate = resolve => require(['../components/rate.vue'], resolve)
let Setaccount = resolve => require(['../components/setaccount.vue'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/bill/qrcode',
      name: 'Home',
      children: [
        {
          path: 'shopinfo',
          component: ShopInfo,
          meta: {
            actityName: 'shopinfo'
          }
        },
        {
          path: 'shopqfc',
          component: Shopqfc,
          meta: {
            actityName: 'shopqfc'
          }
        },
        {
          path: 'setaccount',
          component: Setaccount,
          meta: {
            actityName: 'setaccount'
          }
        },
        {
          path: 'rate',
          component: Rate,
          meta: {
            actityName: 'rate'
          }
        }
      ],
      component: Home
    }
  ]
})
