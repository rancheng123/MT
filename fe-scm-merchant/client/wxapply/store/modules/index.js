import * as types from '../mutations_types'
import axios from '../axios'
const state = {
  merchantInfo: {
    shopId: '',
    name: '',
    contractTel: '',
    merchantName: '',
    mccName: ''
  }
}

const getters = {}

const actions = {
  async pageInit ({commit}) {
    try {
      commit(types.COMMON_PAGEINIT_SUCCESS)
    } catch (e) {
      console.error(e)
    }
  },
  async loadMerchantInfo ({commit}, shopId) {
    try {
      const data = await axios.get('/wxapply/suggest', {params: {shopId}})
      commit(types.LIST_LOAD_MERCHANTINFO_SUCCESS, data)
    } catch (e) {
      console.error(e)
    }
  },
  async submitApplyInfo ({commit}, params) {
    try {
      const data = await axios.post('/wxapply/submit', params)
      commit(types.LIST_SUBMIT_MERCHANTINFO_SUCCESS, data)
    } catch (e) {
      console.error(e)
    }
  }
}

const mutations = {
  [types.COMMON_PAGEINIT_SUCCESS] (state) {
    console.log('pageInit')
  },
  [types.LIST_LOAD_MERCHANTINFO_SUCCESS] (state, merchantInfo) {
    state.merchantInfo = merchantInfo
  },
  [types.LIST_SUBMIT_MERCHANTINFO_SUCCESS] (state) {
    console.log('success')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
