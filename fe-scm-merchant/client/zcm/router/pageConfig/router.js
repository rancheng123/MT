/**
 * 组件列表
 */
let PageContainer = resolve => require(['../../pages/config/PageContainer.vue'], resolve)

let routes = [
  {
    path: 'demo',
    name: 'PageContainer',
    component: PageContainer,
    meta: {
      storeList: ['common'],
      pathName: '/zcm/demo',
      currentPage: 'pageConfig'
    }
  }
]

module.exports = routes
