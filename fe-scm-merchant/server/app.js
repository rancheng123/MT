/**
 *  @file 项目服务入口
 *  --------------------------------------------
 *  Author : xxxxxx
 *  Mail   : xxxxxx@meituan.com
 *  Date   : xxxxxx
 **/

'use strict'

const _ = require('lodash')
const is = require('is-type-of')
const util = require('./common/util.js')
const UAC = require('./common/uac')

module.exports = app => {
  let ssoConf = util.getSSOInfo()

  // sso相关
  app.sso(ssoConf)

  // 在app注入sessionStore
  app.sessionStore = {
    async get (key) {
      const res = await app.redis.get(key)
      if (!res) return null
      return JSON.parse(res)
    },

    async set (key, value, maxAge) {
      if (!maxAge) maxAge = 24 * 60 * 60 * 1000
      value = JSON.stringify(value)
      await app.redis.set(key, value, 'PX', maxAge)
    },

    async destroy (key) {
      await app.redis.del(key)
    }
  }

  class CustomController extends app.Controller {
    /**
     * 用户于请求的参数data, 根据rule强转类型并检查是否符合要求
     * @param rule
     * @param data
     */
    validate (rule, data) {
      app.utils.preProcessValidate(rule, data)
      try {
        this.ctx.validate(rule, data)
      } catch (e) {
        app.throwTypeError(e, app.ErrorType.ParameterError, app.Code.InvalidParams, app.utils.getValidateErrorMessage(e))
      }
    }

    /**
    * 删除返回时的冗余信息
    */
    returnData (data) {
      const {
        ctx
      } = this
      if (is.null(data) || is.undefined(data)) {
        ctx.body = ctx.body || ''
      } else {
        ctx.body = data
      }
    }

    success (data) {
      const {
        ctx
      } = this

      if (is.null(data) || is.undefined(data)) {
        ctx.body = ctx.body || ''
      } else {
        ctx.body = {
          code: app.Code.Ok,
          data,
          message: app.Message(app.Code.Ok)
        }
      }
    }

    /**
     * 获取到用户所有角色
     */
    async getUserRoles () {
      const {
        ctx
      } = this

      let result = await new UAC({uid: ctx.userInfo.id}).getUserRoles()

      if (result &&
        result.data &&
        result.data.data &&
        result.data.data.pageList) {
        ctx.userRoles = result.data.data.pageList.map(item => item.roleName)
        ctx.userInfo && (ctx.userInfo['userRoles'] = ctx.userRoles)
      } else {
        throw new Error('没有访问该系统的权限，可能UAC相关配置不正确')
      }
    }
  }

  app.EraController = CustomController

  class CustomError extends Error {
    /**
     * 自定义错误类
     * @param err [{Error}, {string}] 错误信息
     * @param type [{number}] 错误类型
     * @param code [{number}]
     * @param showMsg {string}
     * @param ext {any}
     */
    constructor (err, type, code, showMsg, ext) {
      if (typeof err === 'string') {
        super(err)
        this.stack = (new Error(err)).stack
      } else {
        super(err.message)
        this.stack = err.stack
      }

      this.name = this.constructor.name
      this.status = code || 500
      this.type = type || app.ErrorType.Exception
      this.showMsg = showMsg
      this.ext = ext
    }
  }

  app.Error = CustomError

  app.validator.addRule('requestInt', (rule, value) => {
    if (!/^-?\d+$/.test(value)) {
      return 'should be a integer\''
    }

    if (rule.hasOwnProperty('max') && value > rule.max) {
      return `should not greater than ${rule.max}`
    }

    if (rule.hasOwnProperty('min') && value < rule.min) {
      return `should not less than ${rule.min}`
    }

    if (rule.hasOwnProperty('values') && _.indexOf(rule.values, value) === -1) {
      return 'out of range'
    }

    // if (rule.hasOwnProperty('required') && true == value && !value) {
    //     return `required`;
    // }
  })

  Error.stackTraceLimit = Infinity
}
