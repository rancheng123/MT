import * as types from '../mutations_types'
const state = {}

const getters = {}

const actions = {
  async pageInit ({commit}) {
    try {
      commit(types.COMMON_PAGEINIT_SUCCESS)
    } catch (e) {
      console.error(e)
    }
  }
}

const mutations = {
  [types.COMMON_PAGEINIT_SUCCESS] (state) {
    console.log('pageInit')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
