/**
 * 对cat的一些封装
 */
class CatLog {
  constructor (ctx) {
    this.ctx = ctx
  }

  addEvent (event, url, result) {
    if (result && result.status === 200) {
      this.ctx.cat.logEvent(`${event}[success]`, `url: ${url}`)
    } else {
      this.ctx.cat.logEvent(`${event}[failed]`, `url: ${url}, errorMsg=${result.msg}`)
    }
  }

  addError (event, e) {
    const _e = e instanceof Error ? e : new Error(e)
    this.ctx.cat.logError(event, _e)
  }
}

module.exports = CatLog
