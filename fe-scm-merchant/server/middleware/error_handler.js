/**
 *  @ErrorHandler file
 *  ---------------------------------------------
 *  Author :
 *  Mail   :
 *  Date   :
 */

'use strict'
let mockData = require('../common/mockData')
module.exports = (options, app) => {
  const AppErrorCodeMap = {
    [`type_${app.ErrorType.Success}`]: '0000',
    [`type_${app.ErrorType.ParameterError}`]: '1000',
    [`type_${app.ErrorType.DataError}`]: '2000',
    [`type_${app.ErrorType.InterfaceError}`]: '3000',
    [`type_${app.ErrorType.Exception}`]: '4000',
    [`type_${app.ErrorType.AuthenticationError}`]: '1000',
  }

  return async function errorHandler (ctx, next) {
    let start = new Date()

    try {
      Error.stackTraceLimit = 6
      await next()
    } catch (err) {
      console.log('err ', err)
      // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
      // 框架会统一监听，并打印对应的错误日志
      if (!(err instanceof app.Error)) {
        app.emit('error', err, app)
      }
      //   app.emit('error', err, app);
      // 自定义错误时异常返回的格式
      const msg = err.showMsg || app.Message(err.status) || '未知错误'

      if (process.env.NODE_ENV === 'local') {
        /**
         * local环境下使用mock功能
         */
        mockData(ctx, err, msg)
      } else {
        ctx.body = {
          code: err.status || ctx.app.Code.SysError,
          message: msg
        }
      }
      // 获取当前上报通道标识
      const report = process.env.NODE_ERA_REPORT || ''
      if (report) {
        // 如果是Cat, 走Cat上报机制
        if (report === 'cat') {
          ctx.cat.logError(err.status)
        }
      }

    }

    let spent = new Date() - start
  }
}
