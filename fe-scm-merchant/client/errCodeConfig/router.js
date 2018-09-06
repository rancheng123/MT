import Router from 'vue-router'
import Vue from 'vue'
let Root = resolve => require(['./pages/Root'], resolve)
let Home = resolve => require(['./pages/Home'], resolve)
let ListComponent = resolve => require(['./pages/list'], resolve)
let InvocationComponent = resolve => require(['./pages/invocationManager'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/mis',
      name: 'root',
      component: Root,
      children: [{
        path: 'home',
        name: 'Home',
        component: Home
      }, {
        path: 'errCodeConfig/list',
        name: 'List',
        component: ListComponent
      }, {
        path: 'errCodeConfig/invocation',
        name: 'Invocation',
        component: InvocationComponent
      }]
    }
  ]
})
