/**
 *  @notfound file
 *  ---------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-05-29
 */

'use strict'

const UAC = require('../common/uac')
/**
 *  这部分路由不经过UAC验证
 */

const WHITE_LIST = [
  '/zcm',
  '/zcm/',
  '/zcm/qualification/info',
  '/zcm/qualification/info/',
  '/mis/home'
]

module.exports = (option, app) => {
  return async function (ctx, next) {
    if (ctx.request.url === '/zcm' ||
      ctx.request.url === '/zcm/' ||
      ctx.request.url.indexOf('/mis/home') === 0 ||
      ctx.request.url.indexOf('/japi/pos') === 0) {
      // TODO
    } else {
      if (ctx.request.url.indexOf('/zcm/noAuthority') === -1 &&
        ctx.request.header['x-requested-with'] !== 'XMLHttpRequest') {
        let url = ctx.request.url
        let splits = url.split('?')
        if (splits && splits.length) {
          let result = await new UAC({uid: ctx.userInfo.id}).getAuthUrl(splits[0])
          if (result.data && !result.data.data) {
            ctx.redirect('/zcm/noAuthority')
          }
        }
      }
    }
    await next()
  }
}
