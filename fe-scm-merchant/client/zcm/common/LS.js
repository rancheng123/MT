/**
 * localStorage 封装
 */

class LS {
  constructor () {
    this.localStorage = window.localStorage
    if (!this.localStorage) {
      console.log('浏览器版本较低，不支持localStorage本地存储')
    }
  }
  getItem (key) {
    if (this.localStorage && key) {
      return this.localStorage.getItem(key)
    } else {
      console.log('请输入获取localStorage的条目key')
    }
  }
  setItem (key, value) {
    if (this.localStorage && key) {
      return this.localStorage.setItem(key, value)
    } else {
      console.log('请输入要设置的localStorage条目key')
    }
  }
}

module.exports = LS
