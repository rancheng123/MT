/* eslint-disable */
/**
 *  运营售后管理系统
 */

import axios from 'axios'
import util from '../../../common/util'
import fetchData from '../../utils/fetchData'

const state = {
  reasonList: [],
  /**
   * 申请进度列表
   */
  processList: [],
  /**
   * 申请日志列表
   */
  applyLogList: [],
  /**
   * 特殊业务列表
   */
  specialRecallList: [],
  problemTime: [],
  tab: '',
  applyPreData: {
    loading: true
  },
  searchCondition: {
    pageNum: 1,
    pageSize: 10,
    applyType: '1'
  },
  deviceAuditInfo: {
    deviceAuditList: [],
    totalCount: 0,
    loadMsg: '',
    pageLoading: true
  },
}
    
const getters = {
  deviceAuditInfo: state => state.deviceAuditInfo,
  searchCondition: state => state.searchCondition,
  reasonList: state => state.reasonList,
  applyPreData: state => state.applyPreData,
  tab: state => state.tab,
  processList: state => state.processList,
  applyLogList: state => state.applyLogList,
  problemTime: state => state.problemTime,
  specialRecallList: state => state.specialRecallList
}
    
const actions = {
  async getDeviceAuditList({ commit, state }, prams) {
    commit('setDeviceAuditInfo', {
      pageLoading: true
    })
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/bdsale/deviceAuditList?${util.paramSerialize(prams)}`
    })

    if (result &&
        result.data.code === 200 &&
        result.data.data &&
        result.data.data.status === 200) {
    
      commit('setDeviceAuditInfo', {
        deviceAuditList: result.data.data.data.list,
        totalCount: result.data.data.data.page.totalCount,
        pageLoading: false
      })
    } else {
      let loadMsg = ''
      if (result.data.code !== 200) {
        loadMsg =  result.data.message
      } else if (result.data.data.status !== 200) {
        loadMsg = result.data.data.msg
      }
      commit('setDeviceAuditInfo', {
        deviceAuditList: [],
        loadMsg: loadMsg,
        pageLoading: false
      })
    }
  },
  /**
   * 换绑预读接口
   */
  async bindChangePreData({ commit, state }, prams) {
    return await fetchData({
      method: 'get',
      url: `/zcm/bdsale/bindChangePreData?${util.paramSerialize(prams)}`,
    })
  },
  /**
   * 发货预读接口
   */
  async deliverGoodsPreData({ commit, state }, prams) {
    return await fetchData({
      method: 'get',
      url: `/zcm/bdsale/deliverGoodsPreData?${util.paramSerialize(prams)}`,
    })
  },
  /**
   * 换绑 
   */
  async bindChange({ commit, state }, prams) {
    return await fetchData({
      method: 'post',
      url: `/zcm/bdsale/bindChange`,
      data: prams
    })
  },
  /**
   * 发货
   */
  async postDevice({ commit, state }, prams) {
    return await fetchData({
      method: 'post',
      url: `/zcm/bdsale/postDevice`,
      data: prams
    })
  },
  /**
   * 回收快递单号 
   */
  async trackInfo({ commit, state }, prams) {
    return await fetchData({
      method: 'post',
      url: '/zcm/bdsale/trackInfo',
      data: prams
    })
  },
  /**
   * 获取换机银行账号
   */
  async bankInfo({ commit, state }, prams) {
    return await fetchData({
      method: 'get',
      url: `/zcm/bdsale/bankInfo?${util.paramSerialize(prams)}`
    })
  },

  /**
   * 获取故障原因
   */
  async getReasonList({ commit, state }, prams) {
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/bdsale/getReasonList?${util.paramSerialize(prams)}`
    })
    
    if (result &&
        result.data.code === 200 &&
        result.data.data.status === 200) {
      commit('setReasonList', result.data.data.data)
    }
  },
  /**
   * 获取故障时间
   */
  async getProblemTime({ commit, state }) {
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/bdsale/getProblemTime`
    })
   
    if (result &&
        result.data.code === 200 &&
        result.data.data.status === 200) {
      commit('setProblemTime', result.data.data.data)
    }
  },
  /**
   * 获取换机申请详情
   */
  async getExchangeApplyDetail({ commit, state}, prams) {
    return await fetchData({
      method: 'GET',
      url: `/zcm/bdsale/getExchangeApplyDetail?${util.paramSerialize(prams)}`
    })
  },
  async getApplyPreData({ commit, state}, prams) {
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/bdsale/getApplyPreData?${util.paramSerialize(prams)}`
    })

    if (result.data && 
        result.data.code === 200 &&
        result.data.data.status === 200) {
      commit('setApplyPreData', {
        loading: false,
        loadMsg: '',
        ...result.data.data.data
      }) 
    } else {
      commit('setApplyPreData', {
        loading: false,
        loadMsg: result.data.code !== 200 ? result.data.message : result.data.data.msg
      }) 
    }

    return new Promise(function (resolve, reject) {
      resolve(result)
    })
  },
  async getProcessList ({ commit, state }, prams) {
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/bdsale/processQuery?${util.paramSerialize(prams)}`
    })

    if (result.data &&
        result.data.code === 200 &&
        result.data.data.status === 200) {
      commit('setProcessList', result.data.data.data)
    }
  },
  async getApplyLogList ({ commit, state }, prams) {
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/bdsale/logQuery?${util.paramSerialize(prams)}`
    })
 
    if (result.data && result.data.code === 200 && result.data.data) {
      commit('setApplyLogList', [])
    }
  },
  async getSpecialRecallList ({ commit, state }, prams) {
    let result = await fetchData({
      method: 'GET',
      url: `/zcm/bdsale/specialRecallList?${util.paramSerialize(prams)}`
    })
 
    if (result.data && result.data.code === 200) {
      commit('setSpecialRecallList', result.data.data.data)
    }
  },
  setSearchCondition ({ commit, state }, prams) {
    commit('setSearchCondition', prams)
  },
  setTab({ commit, state }, prams) {
    commit('setTab', prams)
  }
}

const mutations = {
  setDeviceAuditInfo (state, deviceAuditInfo) {
    state.deviceAuditInfo = deviceAuditInfo
  },
  setSearchCondition (state, searchCondition) {
    state.searchCondition = searchCondition
  },
  setApplyPreData (state, applyPreData) {
    state.applyPreData = applyPreData
  },
  setReasonList(state, reasonList) {
    state.reasonList = reasonList
  },
  setProcessList(state, processList) {
    state.processList = processList
  },
  setApplyLogList(state, logList) {
    state.logList = logList
  },
  setTab(state, tab) {
    state.tab = tab
  },
  setProblemTime(state, problemTime) {
    state.problemTime = problemTime
  },
  setSpecialRecallList(state, specialRecallList) {
    state.specialRecallList = specialRecallList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}