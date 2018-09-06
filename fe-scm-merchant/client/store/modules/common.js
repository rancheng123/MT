/* eslint-disable */
/**
 *  存放一些公共的状态，比如登陆信息等
 */

import axios from 'axios'
import common from '../../common/util.js'

const state = {
  uid: '',
  uname: '',
  tab: '',
  bizUserMccList: [],
  bankList: [],
  bankBranchList: [],
  bankProvinceList: [],
  bankCityList: []
}
  
const getters = {
  uid: state => state.uid,
  uname: state => state.uname,
  tab: state => state.tab,
  bizUserMccList: state => state.bizUserMccList,
  bankList: state => state.bankList,
  bankBranchList: state => state.bankBranchList,
  bankProvinceList: state => state.bankProvinceList,
  bankCityList: state => state.bankCityList
}
  
const actions = {
  getBizUserMccList ({ commit, state }, params) {
    axios.get('/getBizUserMccList').then(function(result) {
      if(result && result.status === 200) {
        commit('set_bizUserMccList', result.data.data)
      }
    })
  },
  getBankList({ commit, state }, params) {
    axios.get('/getBankList').then(function(result) {
      if(result && result.status === 200) {
        commit('set_bankList', result.data.data)
      }
    })
  },
  getBankBranchList({ commit, state }, params) {
    axios.get(`/getBankBranchList?${common.paramSerialize(params)}`).then(function(result) {
      if(result && result.status === 200) {
        commit('set_bankBranchList', result.data.data)
      }
    })
  },
  getBankCityList({ commit, state }, params) {
    axios.get(`/getBankCityList?provinceId=${params}`).then(function(result) {
      if(result && result.status === 200) {
        commit('set_bankCityList', result.data.data)
      }
    })
  },
  getBankProvinceList({ commit, state }, params) {
    axios.get('/getBankProvinceList').then(function(result) {
      if(result && result.status === 200) {
        commit('set_bankProvinceList', result.data.data)
      }
    })
  }
}
  
const mutations = {
  set_uname (state, uname) {
    state.uname = uname
  },
  set_uid (state, uid) {
    state.uid = uid
  },
  set_tab (state, tab) {
    state.tab = tab
  },
  set_bizUserMccList (state, bizUserMccList) {
    state.bizUserMccList = bizUserMccList
  },
  set_bankList (state, bankList) {
    state.bankList = bankList
  },
  set_bankBranchList (state, bankBranchList) {
    state.bankBranchList = bankBranchList
  },
  set_bankCityList(state, bankCityList) {
    state.bankCityList = bankCityList
  },
  set_bankProvinceList(state, bankProvinceList) {
    state.bankProvinceList = bankProvinceList
  }
}
  
export default {
  state,
  getters,
  actions,
  mutations
}