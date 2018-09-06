/* eslint-disable */
/**
 *  公共状态管理
 */

import axios from 'axios'
import util from '../../../common/util'
import Ls from '../../../common/LS'
import fetchData from '../../utils/fetchData'
import { fetchGet, fetchPost } from '../../utils/fetchData';

const LS = new Ls()

const state = {
  pageDataLoading: false,
  pageDataSource: [],
  zcmHome: true,
  asideActiveId: '',
  breadRequired: false,
  setMtConfigSuccess: true,
  currentPage: '',
  currentPageConfig: {},
  tipShow: false,
  mailTypes: [],
  menus: [],
  expressList: [],
  uid: '',
  uRole: '',
  uname: '',
  umis: ''
}
    
const getters = {
  zcmHome: state => state.zcmHome,
  asideActiveId: state => state.asideActiveId,
  uid: state => state.uid,
  uname: state => state.uname,
  breadRequired: state => state.breadRequired,
  setMtConfigSuccess: state => state.setMtConfigSuccess,
  umis: state => state.umis,
  menus: state => state.menus,
  currentPage: state => state.currentPage,
  currentPageConfig: state => state.currentPageConfig,
  uRole: state => state.uRole,
  pageDataLoading: state => state.pageDataLoading,
  pageDataSource: state => state.pageDataSource,
  tipShow: state => state.tipShow,
  mailTypes: mailTypes => state.mailTypes,
  expressList: expressList => state.expressList
}
    
const actions = {

  setCurrentPageConfig({ commit, state }, prams){
    commit('setCurrentPageConfig', prams);
  },
  setCurrentPage({ commit, state }, prams){
    commit('setCurrentPage', prams);
  },
  setZcmHome({ commit, state }, prams) {
    commit('setZcmHome', prams);
  },
  set_Aside_Active_Id({ commit, state }, prams) {
    commit('set_Aside_Active_Id', prams);
  },
  setBreadRequired({ commit, state }, prams) {
    commit('setBreadRequired', prams)
  },
  setMenus({ commit, state }, prams) {
    commit('setMenus', prams)
  },
  setTipShow({ commit, state }, prams) {
    commit('setTipShow', prams)
  },
  /**
   * 获取快递公司 
   */
  async getExpressList({ commit, state }, params) {
    let result = await fetchData({
      method: 'get',
      url: `/zcm/bdsale/getExpressList?${util.paramSerialize(params)}`
    })
    
    if (result.data &&
      result.data.data &&
      result.data.data.status === 200) {
      commit('setExpressList', result.data.data.data)
    }
  },
  /**
   * TODO: 后期接入Redis或其他分布式平台
   * 获取octo配置
   * @param {key} 请求参数，请求键值
   */
  async getMtConfig({ commit, state }, prams) {

    let result = await fetchData({
      method: 'GET',
      url: `/common/getMtConfig?${util.paramSerialize(prams)}`
    })

    if (result && result.status === 200 && result.data.code === 200) {
      if (prams && prams.key === 'tc_menus') {
        commit('setMenus', result.data.data)
        LS.setItem('tc_menus', result.data.data)
      } else {
        if (result.data.data) {
          try {
            commit('setCurrentPageConfig', JSON.parse(result.data.data))
          } catch (e) {
            commit('setCurrentPageConfig', "")
          }
        }
        return new Promise(function (resove, reject) {
          if (typeof result.data.data === 'object') {
            resove(JSON.stringify(result.data.data))
          } else {
            resove(result.data.data)
          }
        })
      }
    }
  },
  /**
   * 获取配置方式
   * api: /zcm/bdsale/getMailType
   */
  async getMailType({ commit, state }, params) {
    let result = await fetchData({
      method: 'get',
      url: `/zcm/bdsale/getMailType?${util.paramSerialize(params)}`
    })
    
    if (result.data &&
      result.data.data &&
      result.data.data.status === 200) {
      if (Array.isArray(result.data.data.data)) {
        commit('setMailType', result.data.data.data)
        return new Promise(function(resove){
          resove()
        })
      } else {
        commit('setMailType', result.data.data.data.list || [])
        return new Promise(function(resove, reject){
          reject()
        })
      }
    }
  },
  /**
   * 更改octo配置
   * @param {*} 请求参数 
   */
  async setMtConfig({ commit, state }, params) {
    return await fetchData({
      method: 'POST',
      url: '/common/setMtConfig',
      data: params
    })
  },
  /**
   * 配置页面获取数据唯一接口
   */
  async getPageDataSource({ commit, state }, params) {
    if (!params || !params.requestUrl) {
      return new Promise(function (resove, reject){
        reject('配置的请求地址requestUrl错误')
      })
    } else {
      let result = {}
      
      commit('setPageDataLoading', true)
      if (params && params.requestMethod === 'post') {
        result = await fetchData({
          method: 'post',
          url: `/common/postPageDataSource`,
          data: params
        })
      } else {
        result = await fetchData({
          method: 'get',
          url: `/common/getPageDataSource?${util.paramSerialize(params)}`,
        })
      }

      commit('setPageDataLoading', false)
      if (result.data &&
          result.data.data &&
          result.data.data.status === 200) {
        if (Array.isArray(result.data.data.data)) {
          commit('setPageDataSource', result.data.data.data)
        } else {
          commit('setPageDataSource', result.data.data.data.list || [])
        }
      }
    }
  }
}

const mutations = {
  setZcmHome (state, zcmHome) {
    state.zcmHome = zcmHome
  },
  set_Aside_Active_Id (state, active_id) {
    state.asideActiveId = active_id
  },
  set_uname (state, uname) {
    state.uname = uname
  },
  set_uid (state, uid) {
    state.uid = uid
  },
  set_umis (state, umis) {
    state.umis = umis
  },
  set_uRole (state, uRole) {
    state.uRole = uRole
  },
  setBreadRequired (state, breadRequired) {
    state.breadRequired = breadRequired
  },
  setMenus (state, menus) {
    state.menus = menus
  },
  setMtConfigSuccess (state, result) {
    state.setMtConfigSuccess = result
  },
  setCurrentPage (state, currentPage) {
    state.currentPage = currentPage
  },
  setCurrentPageConfig (state, currentPageConfig) {
    state.currentPageConfig = currentPageConfig
  },
  setPageDataLoading (state, pageDataLoading) {
    state.pageDataLoading = pageDataLoading
  },
  setPageDataSource (state, pageDataSource) {
    state.pageDataSource = pageDataSource
  },
  setTipShow (state, tipShow) {
    state.tipShow = tipShow
  },
  setMailType (state, mailTypes) {
    state.mailTypes = mailTypes
  },
  setExpressList (state, expressList) {
    state.expressList = expressList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}