import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import list from './modules/list'
import index from './modules/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    list,
    index
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
