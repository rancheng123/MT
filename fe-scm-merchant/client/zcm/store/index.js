/* eslint-disable */
/**
 * vuex按需加载封装
 */
import Vue from 'vue'
import Vuex from 'vuex'

/**
 * 所有store模块在这里引入
 * 每个SPA默认引入common模块
 */
import common from './modules/common'
import bdsale from './modules/bdsale'
import merchant from './modules/merchant'
import qualification from './modules/qualification'

Vue.use(Vuex);

let modules = {
  common,
  bdsale,
  merchant,
  qualification
}

class StoreTool {
  constructor (storeList) {
    this.storeList = storeList;
    this.modules = {};
    this.addModule();
  }
  getAllModuls () {
    return modules
  }
  addModule () {
    if (this.storeList && Array.isArray(this.storeList)) {
      this.storeList.forEach(item => {
        if (item) {
          let matched = this.getAllModuls()[item];
          if (matched) {
            this.modules[item] = matched;
          }
        }
      })
    }
  }
  getStore () {
    let self = this;
    return  new Vuex.Store({
      modules: {
        common,
        ...modules
      }
    })
  }
};

module.exports = StoreTool
