import Router from 'vue-router'
import IndexComponent from './pages/Index'
import ListComponent from './pages/List'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/wxapply/index',
      name: 'Index',
      component: IndexComponent
    },
    {
      path: '/wxapply/list',
      name: 'List',
      component: ListComponent
    }
  ]
})
