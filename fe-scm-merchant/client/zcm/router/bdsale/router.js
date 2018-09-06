/**
 * SPA路由配置页面，全部实现懒加载
 */
let List = resolve => require(['../../pages/bdsale/List.vue'], resolve)
let RecallApply = resolve => require(['../../pages/bdsale/RecallApply.vue'], resolve)
let ExchangeApply = resolve => require(['../../pages/bdsale/ExchangeApply.vue'], resolve)
let Recall = resolve => require(['../../pages/bdsale/Recall.vue'], resolve)
let Exchange = resolve => require(['../../pages/bdsale/Exchange.vue'], resolve)
let Process = resolve => require(['../../components/bdsale/Process.vue'], resolve)
let Log = resolve => require(['../../components/bdsale/Log.vue'], resolve)

let routes = [
  {
    path: 'bdsale',
    name: 'dbsale',
    component: List,
    meta: {
      storeList: ['bdsale'],
      pathName: '/zcm/bdsale',
      currentPage: 'bdsaleList'
    }
  },
  {
    path: 'bdsale/list',
    name: 'dbsaleList',
    component: List,
    meta: {
      storeList: ['bdsale'],
      pathName: '/zcm/bdsale/list',
      currentPage: 'bdsaleList'
    }
  },
  {
    path: 'bdsale/device/recall',
    name: 'recall',
    component: Recall,
    children: [{
      path: 'info',
      component: RecallApply,
      meta: {
        actityName: 'info',
        storeList: ['bdsale'],
        pathName: '/zcm/bdsale/device/recall/info',
        currentPage: 'deviceRecallInfo'
      }
    }, {
      path: 'process',
      component: Process,
      meta: {
        actityName: 'process',
        storeList: ['bdsale'],
        pathName: '/zcm/bdsale/device/recall/process',
        currentPage: 'deviceRecallProcess'
      }
    }, {
      path: 'log',
      component: Log,
      meta: {
        actityName: 'log',
        storeList: ['bdsale'],
        pathName: '/zcm/bdsale/device/recall/log',
        currentPage: 'deviceRecallLog'
      }
    }],
    meta: {
      storeList: ['bdsale'],
      pathName: '/zcm/bdsale/device/recall',
      currentPage: 'deviceRecall'
    }
  },
  {
    path: 'bdsale/device/exchange',
    name: 'Exchange',
    component: Exchange,
    children: [{
      path: 'info',
      component: ExchangeApply,
      meta: {
        actityName: 'info',
        storeList: ['bdsale'],
        pathName: '/zcm/bdsale/device/exchange/info',
        currentPage: 'deviceExchangeInfo'
      }
    }, {
      path: 'process',
      component: Process,
      meta: {
        actityName: 'process',
        storeList: ['bdsale'],
        pathName: '/zcm/bdsale/device/exchange/process',
        currentPage: 'deviceExchangeProcess'
      }
    }, {
      path: 'log',
      component: Log,
      meta: {
        actityName: 'log',
        storeList: ['bdsale'],
        pathName: '/zcm/bdsale/device/exchange/log',
        currentPage: 'deviceExchangeLog'
      }
    }],
    meta: {
      storeList: ['bdsale'],
      pathName: '/zcm/bdsale/device/exchange',
      currentPage: 'deviceExchange'
    }
  },
  {
    path: 'bdsale/device/recallApply',
    name: 'recallApply',
    component: RecallApply,
    meta: {
      storeList: ['bdsale'],
      pathName: '/zcm/bdsale/device/recallApply',
      currentPage: 'deviceRecallApply'
    }
  },
  {
    path: 'bdsale/device/exchangeApply',
    name: 'exchangeApply',
    component: ExchangeApply,
    meta: {
      storeList: ['bdsale'],
      pathName: '/zcm/bdsale/device/exchangeApply',
      currentPage: 'deviceExchangeApply'
    }
  }
]

module.exports = routes
