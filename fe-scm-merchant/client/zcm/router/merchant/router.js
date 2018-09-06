import Vue from 'vue'
import Router from 'vue-router'

let Home = resolve => require(['../../pages/merchant/index_merchant.vue'], resolve)
let Inspection = resolve => require(['../../pages/merchant/inspection_merchant.vue'], resolve)
let Export = resolve => require(['../../pages/merchant/export_merchant.vue'], resolve)

Vue.use(Router)

let routes = [
  {
    path: 'merchant/list',
    name: 'Home',
    component: Home,
    meta: {
      storeList: ['merchant'],
      pathName: '/zcm/merchant/list',
      currentPage: 'merchantList'
    }
  },
  {
    path: 'merchant/inspection',
    name: 'Inspection',
    component: Inspection,
    meta: {
      storeList: ['merchant'],
      pathName: '/zcm/merchant/inspection',
      currentPage: 'merchantInspection'
    }
  },
  {
    path: 'merchant/export',
    name: 'Export',
    component: Export,
    meta: {
      storeList: ['merchant'],
      pathName: '/zcm/merchant/export',
      currentPage: 'merchantExport'
    }
  }
]

module.exports = routes
