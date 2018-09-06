// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '../store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

/**
 * import ElementUI as UI components
 */
Vue.use(ElementUI)

/**
 * 拦截路由中间件
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.actityName)) {
    to.matched.forEach(item => {
      if (item.meta.actityName) {
        store.commit('set_tab', item.meta.actityName)
      }
    })
  }

  let $le = document.querySelector('[name="unserinfo"]')
  store.commit('set_uname', $le.getAttribute('data-name'))
  store.commit('set_uid', $le.getAttribute('data-uid'))

  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
