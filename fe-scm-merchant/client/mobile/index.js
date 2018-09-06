/**
 * 商户自助项目入口文件
 */
import Vue from 'vue'
import App from './App'
import store from '../store'
import router from './router'
import processBar from './components/common/processBar'
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
import './common/pxToRem'
/**
 * 引入基础样式
 */
import './less/base.less'
import './less/common.less'
import './less/mint-bass.less'
/**
 * 注册组件
 */
import './components/componentsRegister'
/**
 * 注册自定义指令
 */
import './components/directiveRegister'

// 进度条注入到body中
let loading = new Vue(processBar).$mount()
document.body.append(loading.$el)

Vue.config.productionTip = false

/**
 * 拦截路由中间件
 */
router.beforeEach((to, from, next) => {
  let $le = document.querySelector('[name="unserinfo"]')
  store.commit('set_uname', $le.getAttribute('data-name'))
  store.commit('set_uid', $le.getAttribute('data-uid'))
  /**
   * 显示进度条
   */
  loading.start()
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
