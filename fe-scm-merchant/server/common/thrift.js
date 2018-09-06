/**
 * 对thrift的一些封装
 * author: wukong
 */
const { APPKEY } = require('./globalConfig')
const ENV = process.env.NODE_ENV

class ThriftRequest {
  constructor (ctx) {
    if (!ctx) {
      throw Error('上下文对象不能为空')
    }
    this.ctx = ctx
  }
  /**
   * 调用thrift接口
   * @param {Object} opts
   */
  async call (opts = {}) {
    if (this.ctx && this.ctx.thrift) {
      let options = {
        localAppKey: APPKEY,
        remoteAppKey: opts.remoteAppKey,
        timeout: 5000,
        service: opts.service,
        serviceName: opts.serviceName,
        methodName: opts.methodName,
        params: opts.params
      }

      if ((ENV === 'local' || ENV === 'dev') && opts.serviceList) {
        options.serviceList = opts.serviceList
      }

      this.printLog(options)

      return await this.ctx.thrift.init(options)
    } else {
      throw Error('上下文中未挂载thrift实例')
    }
  }
  /**
   * 打印日志
   * @param {Object} log
   */
  printLog (log) {
    try {
      let logStr = ''
      Object.keys(log).forEach(key => {
        logStr += `${key} = ${JSON.stringify(log[key])}，`
      })

      console.log(' [THRIFT_REQUEST_LOG] ' + logStr.replace(/\，$/, ''))
    } catch (e) {
      console.log('Thrift接口打印日志异常', e)
    }
  }
}

module.exports = {
  ThriftRequest: ThriftRequest
}
