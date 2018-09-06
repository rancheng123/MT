/**
 *  @file util工具函数
 *  --------------------------------------------
 *  Author : xxxxxx
 *  Mail   : xxxxxx@meituan.com
 *  Date   : xxxxxx
 **/

'use strict'

const _ = require('lodash')

const utils = {
  /**
   * 强制转换int
   * @param val
   * @return {*}
   */
  getInt (val) {
    const num = parseInt(val)
    return isNaN(num) ? 0 : num
  },
  /**
   * 将val转换为的指定的类型
   * @param val
   * @param type
   * @return {*}
   */
  convertType (val, rule) {
    if (typeof rule !== 'object') {
      rule = {
        type: rule
      }
    }
    const type = rule.type
    switch (type) {
      case 'number':
      case 'int':
        return utils.getInt(val)
        break
      case 'requestInt':
        return utils.getInt(val)
        break
    }

    return val
  },
  /**
   * 对需要检验的参数作预处理
   * @param rule
   * @param params
   */
  preProcessValidate (rule, params) {
    if (!params) {
      return
    }
    _.each(rule, function (type, key) {
      // 形如：{ type: 'string', required: false }
      const key_rule = typeof type === 'object' ? type : {
        type
      }
      // 传入的字段值
      const val = params[key]
      // var required = key_rule.required == undefined || key_rule.required;
      // notRequired表示不必须时候有两种情况 ：1.存在的且为false，2不存在。
      // 故下边的required 1为不必须，0位必须
      const notRequired = (key_rule.required && key_rule.required == false) || undefined == key_rule.required
      // 当有值的时候才去做转换,跟必传不必传没有任何关系
      if (undefined !== val && val) {
        // if (val !== undefined || !required) {
        params[key] = utils.convertType(val, key_rule)
      }
    })

    return params
  },
  getValidateErrorMessage (err) {
    const errors = err.errors || []
    let msg = []
    // 错误需要翻转下，才能从第一个错误开始
    _.each(errors.reverse(), function (e) {
      msg = 'param `' + e.field + '` ' + e.message
      return false
    })
    return msg
  }
}

module.exports = utils
