/* eslint-disable */
/**
 *  商户信息查询列表页
 */
import axios from 'axios'
import common from '../../../common/util.js'

const state = {
  provinceList: [],
  cityList: [],
  businessInfoList: [],
  shopCheckList: [],
  regionList: [],
  userRole: '',
  loginName: '',
  businessLoadMsg: {
    loading: false,
    errorMsg: '',
    totalCount: 100,
    pagination: 1
  },
  shopCheckLoadMsg: {
    loading: true,
    errorMsg: '',
    totalCount: 0
  },
  businessSearch: {
    pageSize: 10
  },
  productTypeList: [],
  exportLoadMsg: {
    loading: false,
    errorMsg: '',
  },
  exportInfo: [],
  exportMsg: {
    btnDisabled: false,
    errorMsg: '',
    successMsg: ''
  }
}

const getters = {
  provinceList: state => state.provinceList,
  cityList: state => state.cityList,
  loginName: state => state.loginName,
  businessInfoList: state => state.businessInfoList,
  shopCheckList: state => state.shopCheckList,
  businessLoadMsg: state => state.businessLoadMsg,
  shopCheckLoadMsg: state => state.shopCheckLoadMsg,
  businessSearch: state => state.businessSearch,
  regionList: state => state.regionList,
  userRole: state => state.userRole,
  exportLoadMsg: state => state.exportLoadMsg,
  exportInfo: state => state.exportInfo,
  productTypeList: state => state.productTypeList,
  exportMsg: state => state.exportMsg
}
  
const actions = {
  getUserRole({ commit, state }, prams) {
    axios.get('/merchant/getUserRole').then(function(result){
      commit('setUserRole', result.data && result.data.data && result.data.data.data);
    })
  },
  getProvinceList({ commit, state }, prams) {
    axios.get('/getProvinceList').then(function(result){
      commit('setProvinceList', result.data && result.data.data);
    })
  },
  getCityList({ commit, state }, id) {
    axios.get('/getCityList?id=' + id).then(function(result){
      commit('setCityList', result.data && result.data.data);
    })
  },
  getRegionList({ commit, state }, id) {
    axios.get('/getCityList?id=' + id).then(function(result){
      commit('setRegionList', result.data && result.data.data);
    })
  },
  setLoginName({ commit, state }, userName) {
    commit('setLoginName', userName);
  },
  getBusinessInfo({ commit, state }, params) {
    axios.get(`/getBusinessInfo?${common.paramSerialize(params)}`).then(function(result){
     
      if(result.status !== 200) {
        commit('setBusinessLoadMsg', {
          loading: false,
          errorMsg: result.message
        });
      } else {
        if (result.data && result.data.code === 200) {
          commit('setBusinessLoadMsg', {
            loading: false,
            errorMsg: '',
            totalCount: (result.data.data.data && result.data.data.data.totalCount) || 0,
            pagination: 1
          });
          
          if (result.data.data.data && result.data.data.data.shopList) {
            let shopList = result.data.data.data.shopList;
            let showVisitRecord = result.data.data.data.showVisitRecord;
            let showTradeRecord  = result.data.data.data.showTradeRecord;

            shopList.forEach(item => {
              item['showVisitRecord'] = showVisitRecord;
              item['showTradeRecord'] = showTradeRecord;
            })
            
            commit('setBusinessInfo', (result.data.data.data && result.data.data.data.shopList) || []);
          } else {
            commit('setBusinessInfo', []);
          }
        } else {
          commit('setBusinessLoadMsg', {
            loading: false,
            errorMsg: '查询异常，请重试！',
            totalCount: 0
          });
          commit('setBusinessInfo', []);
        } 
      }
    })
  },
  getShopCheckInfo({ commit, state }, {shopId, pageNum, pageSize}) {
    axios.get(`/getShopCheckInfo?shopId=${shopId}&pageNum=${pageNum}&pageSize=${pageSize}`).then(function(result){
      
      if (result.status !== 200) {
        commit('setShopCheckLoadMsg', {
          loading: false,
          errorMsg: '查询异常，请重试！',
          totalCount: 0
        })
      } else {
        if (result.data && result.data.code === 200) {
          commit('setShopCheckLoadMsg', {
            loading: false,
            errorMsg: '',
            totalCount: (result.data.data && result.data.data.data && result.data.data.data.totalCount) || 0
          })
          commit('setShopCheckList', result.data.data.data && result.data.data.data.shopCheckList);
        } else {
          commit('setShopCheckLoadMsg', {
            loading: false,
            errorMsg: '查询异常，请重试！',
            totalCount: 0
          })
        }
      }
    })
  },
  setShopCheckLoadMsg({ commit, state }, prams) {
    commit('setShopCheckLoadMsg', prams);
  },
  setBusinessLoadMsg({ commit, state }, prams) {
    commit('setBusinessLoadMsg', prams);
  },
  setBusinessSearch({ commit, state }, prams) {
    commit('setBusinessSearch', prams);
  },
  getExportInfo({ commit, state }, params) {
    axios.get(`/merchant/getDownLoadInfo?${common.paramSerialize(params)}`).then(function(result){
      if(result.status !== 200) {
        commit('setExportLoadMsg', {
          loading: false,
          errorMsg: result.message
        });
      } else {
        const resultData = result.data

        if (resultData && resultData.code === 200) {
          commit('setExportLoadMsg', {
            loading: false,
            errorMsg: ''
          });

          if (resultData.data) {
            commit('setExportInfo', {
              list: resultData.data,
            })
          } else {
            commit('setExportInfo', {
              list: [],
            });
          }
        } else {
          commit('setExportLoadMsg', {
            loading: false,
            errorMsg: '查询异常，请重试！',
          });
          commit('setExportInfo', {
            list: [],
          });
        }
      }
    })
  },
  getProductTypeList({ commit, state }, prams) {
    axios.get('/getProductTypeList').then(function(result){
      commit('setProductTypeList', result.data && result.data.data);
    })
  },
  exportMerchant({ commit, state }, params) {
    axios.get(`/merchant/exportMerchant?${common.paramSerialize(params)}`).then(function(result){
      let errorMsg, successMsg

      if (result.status == 200) {
        const resultData = result.data

        if (resultData && resultData.code === 200 && resultData.data.status === 200) {
          errorMsg = ''
          successMsg = '操作成功，根据数据量此导出过程可能需要几分钟！'
        } else {
          errorMsg = resultData.message
          successMsg = ''
        }

      } else {
        errorMsg = '下载异常，请重试！'
        successMsg = ''
      }

      commit('setExportMsg', {
        btnDisabled: false,
        errorMsg,
        successMsg
      })
    })
  },
  setExportMsg({ commit, state }, params) {
    commit('setExportMsg', params);
  },
}
  
const mutations = {
  setProvinceList (state, provinceList) {
    state.provinceList = provinceList
  },
  setCityList (state, cityList) {
    state.cityList = cityList
  },
  setLoginName (state, loginName) {
    state.loginName = loginName
  },
  setBusinessInfo(state, infoList) {
    state.businessInfoList = infoList
  },
  setShopCheckList(state, shopCheckList) {
    state.shopCheckList = shopCheckList
  },
  setBusinessLoadMsg(state, obj) {
    state.businessLoadMsg = obj
  },
  setShopCheckLoadMsg(state, obj) {
    state.shopCheckLoadMsg = obj;
  },
  setBusinessSearch(state, obj) {
    state.businessSearch = obj
  },
  setRegionList(state, regionList) {
    state.regionList = regionList
  },
  setUserRole(state, userRole) {
    state.userRole = userRole
  },
  setExportLoadMsg(state, obj) {
    state.exportLoadMsg = obj
  },
  setExportInfo(state, exportInfo) {
    state.exportInfo = exportInfo
  },
  setProductTypeList(state, productTypeList) {
    state.productTypeList = productTypeList
  },
  setExportMsg(state, obj) {
    state.exportMsg = obj
  }
}
  
export default {
  state,
  getters,
  actions,
  mutations
}