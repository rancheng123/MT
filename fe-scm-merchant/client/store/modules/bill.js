/* eslint-disable */
/**
 *  pc上单页面相关状态
 */

import axios from 'axios'

const state = {
    shopInfoEntity: {},
    shopInfoLoading: false
  }
    
  const getters = {
    shopInfoEntity: state => state.shopInfoEntity,
    shopInfoLoading: state => state.shopInfoLoading
  }
    
  const actions = {
    getShopInfo({ commit, state }, params) {
      axios.get(`/getShopInfo?shopId=${params.shopId}`).then(function(result){
        commit('setShopInfo', {
          shopName: ''
        });
        commit('setShopInfoLoading', false);
      })
    }
  }
    
  const mutations = {
    setShopInfo (state, shopInfo) {
      state.shopInfoEntity = shopInfo
    },
    setShopInfoLoading (state, loading) {
      state.shopInfoLoading = loading
    }
  }
    
  export default {
    state,
    getters,
    actions,
    mutations
  }