/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'
import merchant from './modules/merchant'
import common from './modules/common'
import bill from './modules/bill'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    merchant,
    common,
    bill
  }
})
