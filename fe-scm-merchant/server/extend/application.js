/**
 *  @file application
 *  --------------------------------------------
 *  Author : xxxxxx
 *  Mail   : xxxxxx@meituan.com
 *  Date   : xxxxxx
 **/

'use strict'

const utils = require('../lib/utils')

const ErrorCode = require('../../config/error_code')

module.exports = {
  /**
   * 公共函数
   */
  get utils () {
    return utils
  },

  /**
   * 错误码
   */
  get Code () {
    return ErrorCode.Code
  },

  get ErrorType () {
    return ErrorCode.ErrorType
  },

  /**
   * 错误码信息
   * @param code
   * @param msg [{string}] 自定义错误信息
   */
  Message (code) {
    return ErrorCode.Message[code]
  },

  /**
   * 根据错误码抛出错误
   * @param err
   * @param type
   * @param code
   * @param showMsg [{string}] 自定义错误信息
   */
  throwTypeError (err, type, code, showMsg, ext) {
    if (err instanceof this.Error) {
      err.showMsg = showMsg || err.showMsg
      err.type = err.type || type
      err.status = err.status || code
      if (ext) {
        err.ext = Array.isArray(err.ext) ? [ext, ...err.ext] : [ext, err.ext]
      }
      throw err
    }
    throw new this.Error(err, type, code, showMsg, ext)
  }
}
