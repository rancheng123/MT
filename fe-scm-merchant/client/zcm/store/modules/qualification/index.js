/* eslint-disable */
/**


 *  公共状态管理
 */
import axios from 'axios'
import common from '../../../common/util.js'
import util from '../../../common/util'
import fetchData from '../../utils/fetchData'
import { resolve } from 'path';

const state = {
  aduitReasonList: [],
  tabList: [],
  imgList: [],
  auditList: [],
  AduitReasonMap: {},
  customerInfo: {}
}
    
const getters = {
  auditList: state => state.auditList,
  tabList: state => state.tabList,
  imgList: state => state.imgList,
  aduitReasonList: state => state.aduitReasonList,
  customerInfo: state => state.customerInfo,
  AduitReasonMap: state => state.AduitReasonMap
}
    
const actions = {
  /**
   * 获取最新编辑的收单客户信息-增加实名认证
   */
  async getCustomerWithAuth({ commit, state }, prams) {
    let requestUrl = '/zcm/qualification/getCustomerWithAuth?'
    if (prams.qualCode) {
      requestUrl = '/zcm/qualification/preFillCustomerWithAuth?'
    }

    let result = await fetchData({
      method: 'GET',
      url: `${requestUrl}${util.paramSerialize(prams)}`
    })

    if (result &&
        result.data.code === 200 &&
        result.data.data) {
      commit('setCustomerInfo', result.data.data)
      return new Promise((resolve, reject) => {
        let r = result.data.data
        if (r && !r.hasOwnProperty('type')) {
          r = null
        }
        resolve(r)
      })
    }

    return new Promise((resolve, reject) => {
      reject()
    })
  },
  /**
   * 获取审核页面详情
   */
  async getAuditList({ commit, state }, prams) {
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/qualification/queryAudit?${util.paramSerialize(prams)}`,
    })
    if (result && result.data.code === 200) {
      if (result.data.data.status.code === '100000') {
        commit('setAuditList', result.data.data.data)
      } 
      
      return new Promise((resolve, reject) => {
        resolve(result.data.data)
      })

    }

    return new Promise((resolve, reject) => {
      reject('网络错误,请您稍后刷新重试')
    })
  },
  /**
   * 获取审核驳回原因
   */
  async getAduitReasonList({ commit, state }, prams) {
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/qualification/queryReason?${util.paramSerialize(prams)}`
    })
    if (result &&
      result.data.code === 200 &&
      result.data.data) {
      commit('setAduitReasonList', result.data)
      return new Promise((resolve, reject) => {
        resolve()
      })
    }

    return new Promise((resolve, reject) => {
      reject('网络错误,请您稍后刷新重试')
    })
  },
  /**
   * 保存客户信息
   */
  async saveCustomerWithAuth({ commit, state }, prams) {
    return await fetchData({
      method: 'POST',
      url: `/zcm/qualification/saveCustomerWithAuth`,
      data: prams
    })
  },
  /**
   * 提交审核
   */
  async submitAudit({ commit, state }, prams) {
    return await fetchData({
      method: 'POST',
      url: `/zcm/qualification/submitAudit`,
      data: prams
    })
  },

  /**
   * 提交审核驳回信息
   */
  async saveAudit({ commit, state }, prams) {
    return await fetchData({
      method: 'POST',
      url: `/zcm/qualification/saveAudit`,
      data: prams
    })
  },
}

const mutations = {
  setCustomerInfo (state, customerInfo) {
    state.customerInfo = customerInfo
  },
  setTabList(state, tabList) {
    state.tabList = tabList || []
  },
  setAuditList(state, data) {
    state.auditList = data.auditItems
    state.imgList = data.photoItems || []
    var tabList = [] 
    if (state.imgList.length != 0) {
      tabList = data.photoItems.map((item) => {
        return item.photoName
      })
      state.tabList = tabList
    }
  },
  setAduitReasonList(state, data) {
    state.aduitReasonList = data.data || []
    state.aduitReasonList.forEach(function(element) {
      state.AduitReasonMap[element.reasonId] = element.content
    });
  },
  delAduitReasonMap(state, data) {
    state.AduitReasonMap = {}
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}