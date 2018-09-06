import Vue from 'vue'
import Router from 'vue-router'

let Review = resolve => require(['../../pages/qualification/qualification_review.vue'], resolve)
let Info = resolve => require(['../../pages/qualification/Info.vue'], resolve)

Vue.use(Router)

let routes = [
  {
    path: 'qualification/review',
    name: 'Review',
    component: Review,
    meta: {
      storeList: ['qualification'],
      pathName: '/zcm/qualification/review',
      currentPage: 'qualificationReview'
    }
  },
  {
    path: 'qualification/info',
    name: 'Info',
    component: Info,
    meta: {
      storeList: ['qualification'],
      pathName: '/zcm/qualification/info',
      currentPage: 'qualificationInfo'
    }
  }
]

module.exports = routes
