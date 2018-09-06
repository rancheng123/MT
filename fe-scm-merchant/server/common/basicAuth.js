/**
 * 生成请求头BA
 * @param {} param0
 */
let {APPKEY} = require('./globalConfig')
let crypto = require('crypto')
let SECRECT = 'kd0THfN317XiUqv'
let env = process.env.NODE_ENV

if (env === 'prod') {
  SECRECT = 'X2I0bCaAV5XSw9V'
}

module.exports = function createMTAuthHeaders ({uri, method}) {
  let authInfo = {
    appKEY: APPKEY,
    secret: SECRECT,
    uri: uri,
    method: method || 'POST'
  }

  let now = new Date().toGMTString()

  return {
    'Authorization': `MWS ${authInfo.appKEY}:${crypto
      .createHmac('sha1', authInfo.secret)
      .update(`${authInfo.method} ${authInfo.uri}\n${now}`)
      .digest('base64')}`,
    'Date': now
  }
}
