// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import StoreTool from './store'
import ProcessBar from './pages/layout/ProcessBar'
import { Loading } from 'element-ui'
import fetchData from './common/fetchData'
import util from './common/util'
import pageRender from './pageRender'
import sw from './common/sw-register.js'

let store = null
let loading = Vue.prototype.$progress = new Vue(ProcessBar).$mount();
/**
 *  这部分路由不经过UAC验证
 */
let whiteList = [
  '/',
  '/zcm',
  '/zcm/noAuthority',
  '/zcm/qualification/info'
];

Vue.config.productionTip = false
/**
 * 注入事件总线
 */
Vue.prototype.$eventBus = new Vue()
/**
 * 引入饿了么组件库
 */
Vue.use(ElementUI)

/**
 * 进度条挂在到body里面
 */
document.body.appendChild(loading.$el)
/**
 * 按需加载store,本路由用到的才加载进去
 */
let storeAutoAdapt = (to) => {

  if (router.options) {
    let routes = router.options.routes
  
    if (routes.length > 0) {
      let pathname = (to && to.path) || window.location.pathname
      let matchedPath = false
  
      let recursion = routes => {
        for (let i = 0; i < routes.length; i++) {
          if (routes[i].meta && routes[i].meta.pathName === pathname.replace(/\/$/, '')) {
            store = new StoreTool(routes[i].meta.storeList).getStore()
            new Vue({
              el: '#app',
              router,
              store,
              render: h => h(App)
            })
  
            matchedPath = true
            break
          } else if (routes[i].children && routes[i].children.length > 0) {
            recursion(routes[i].children)
          }
        }
      }
      
      /**
       * 递归判断加载的store
       */
      recursion(routes)
  
      if (!matchedPath) {
        new Error('没有找到匹配的路由，检查路由配置是否正确')
      }
    }
  }
}

/**
 * 拦截路由中间件
 */
router.beforeEach(async (to, from, next) => {

  if (to.path && to.path.replace(/\/$/, '') === '/zcm') {
    store.commit('setZcmHome', true)
  } else {
    store.commit('setZcmHome', false)
  }
 
  if (to.matched.some(record => record.meta.actityName)) {
    to.matched.forEach(item => {
      if (item.meta.actityName) {
        store.commit('setTab', item.meta.actityName)
      }
    })
  }
  
  // 记录当前页面唯一ID
  if (to.meta.currentPage) {
    store.commit('setCurrentPage', to.meta.currentPage)
  }

  let $le = document.querySelector('[name="unserinfo"]')
  if ($le) {
    store.commit('set_uname', $le.getAttribute('data-name'))
    store.commit('set_uid', $le.getAttribute('data-uid'))
    store.commit('set_umis', $le.getAttribute('data-mis'))
    store.commit('set_uRole', $le.getAttribute('data-role'))
  }

  let result = await handleAsyncAuth(to.path)

  if (result && 
      result.status === 200 &&
      result.data &&
      result.data.data) {
    next() 
  } else {
    if (!whiteList.some(item => item === to.path.replace(/\/$/, ''))) {
      next({
        path: '/zcm/noAuthority',
        query: {
          zcm_active_index: to.query.zcm_active_index
        }
      })
    } else {
      next()
    }
  }
})

/**
 * 获取url访问权限
 */
let handleAsyncAuth = async (to) => {
  if (whiteList.some(item => item === to.replace(/\/$/, ''))) {
    return ''
  }

  let result = await fetchData({
    method: 'post',
    url: '/common/getAuthUrl',
    data: {
      url: to
    }
  })

  return result
}

/**
 * 获取每个组件中的asyncData函数并执行
 * 执行在DOM更新之前
 * 页面中需要加载的数据可以放到asyncData中
 */
let handleAsyncData = () => {

  router.beforeResolve((to, from, next) => {

    let matched = router.getMatchedComponents(to);
    let prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    let activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));

    if (!activated.length) {
      return next();
    }

    loading.start()

    Promise.all(
      activated
      .filter(c => c.asyncData && (!c.asyncDataFetched || !to.meta.keepAlive))
      .map(async c => {
          await c.asyncData({store, route: to});
          c.asyncDataFetched = true;
      })
    )
    .then(() => {
      next();
    })
  });
}

/**
 * 加载store
 */
storeAutoAdapt()
/**
 * 执行asyncData方法
 */
handleAsyncData()
/**
 * 注册Service Worker
 */
sw.register()
