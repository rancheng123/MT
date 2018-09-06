/**
 *  @file error_Config
 *  --------------------------------------------
 *  Author : xxxxxx
 *  Mail   : xxxxxx@meituan.com
 *  Date   : xxxxxx
 **/

'use strict'

/**
 * 错误代码
 */
const Code = {
  Ok: 200, // 成功

  InvalidParams: 402, // 参数错误

  // =================系统相关错误 500========================
  SysError: 500, // 系统错误
  SysRedisFail: 501, // 操作redis失败
  SysInitKpUserFail: 502, // 初始化用户失败
  SysSendSmsFail: 503 // 短信验证码下发错误
}

/**
 * app api 错误类型 值不可修改
 */
const ErrorType = {
  // 成功
  Success: 0,
  // 参数异常
  ParameterError: 1,
  // 数据异常
  DataError: 2,
  // 接口异常
  InterfaceError: 3,
  // 未知异常
  Exception: 7,
  // app 请求校验异常
  AuthenticationError: 8
}

/**
 * 错误信息
 * @type {{}}
 */
const Message = {
  [Code.Ok]: '操作成功',

  [Code.InvalidParams]: '参数错误',

  // =================系统相关错误 500========================
  [Code.SysError]: '系统错误'
}

/**
 * 错误等级
 * @type {{}}
 */
// const ErrLevel = {}

module.exports = {
  Code,
  ErrorType,
  Message
}
