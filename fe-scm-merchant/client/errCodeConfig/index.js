// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from '../store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axiosPlugin from './common/net'
import fetchData from './common/fetchData'

Vue.config.productionTip = false

/**
 * import ElementUI as UI components
 */
Vue.use(ElementUI, {size: 'medium'})

Vue.prototype.$axios = axiosPlugin(Vue.prototype.$notify)

/**
 *  这部分路由不经过UAC验证
 */
let whiteList = [
  '/',
  '/zcm',
  '/zcm/noAuthority',
  '/mis/home'
]

/**
 * 拦截路由中间件
 */
router.beforeEach(async (to, from, next) => {
  let $le = document.querySelector('[name="unserinfo"]')
  store.commit('set_uname', $le.getAttribute('data-name'))
  store.commit('set_uid', $le.getAttribute('data-uid'))

  let result = await handleAsyncAuth(to.path)

  if (result &&
      result.code === 200 &&
      result.data) {
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
