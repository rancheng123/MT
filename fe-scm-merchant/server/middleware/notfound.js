/**
 *  @notfound file
 *  ---------------------------------------------
 *  Author :
 *  Mail   :
 *  Date   :
 */

'use strict'

module.exports = (option, app) => {
  return async function (ctx, next) {
    await next()

    if (ctx.status !== 404 || ctx.body) {
      return
    }

    ctx.status = 404

    if (ctx.acceptJSON) {
      ctx.body = {
        message: 'Not Found',
      }
      return
    }

    const notFoundHtml = '<h1>404 Not Found</h1>'

    if (option.pageUrl && ctx.path === option.pageUrl) {
      ctx.body = `${notFoundHtml}<p><pre><code>config.notfound.pageUrl(${option.pageUrl})</code></pre> is unimplemented</p>`
      return
    }

    if (option.pageUrl) {
      ctx.realStatus = 404
      ctx.redirect(option.pageUrl)
      return
    }

    ctx.body = notFoundHtml
  }
}
