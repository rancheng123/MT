/**
 * mock封装
 * @param {Object} ctx 执行上下文
 */
const fs = require('fs')
const path = require('path')

module.exports = function (ctx, err, msg) {
  let request = ctx.request
  let response = ctx.response
  let defaultReturnBody = {
    code: err.status || ctx.app.Code.SysError,
    message: msg
  }

  /**
   * 只mock异步请求，请在异步请求头中添加x-requested-with
   * 如果接口返回404，我会在这里拦截一下
   */
  if (request.header['x-requested-with'] === 'XMLHttpRequest' &&
    response &&
    +response.status === 404) {
    let requestUrl = request.url

    if (requestUrl) {
      let urlArray = requestUrl.split('?')
      /**
       * 必须是绝对路径
       */
      let filePath = path.resolve(__dirname, '../mock' + urlArray[0] + '.json')

      try {
        /**
         * 同步判断文件是否存在
         */
        let fsStat = fs.statSync(filePath)
        if (fsStat) {
          /**
           * 同步读取文件内容
           */
          let fileContent = fs.readFileSync(filePath)
          ctx.body = {
            code: 200,
            data: fileContent.toString() ? JSON.parse(fileContent.toString()) : null,
            message: '请求成功'
          }
        }
      } catch (e) {
        console.log('mock数据异常:', e)
        ctx.body = defaultReturnBody
      }
    } else {
      ctx.body = defaultReturnBody
    }
  } else {
    ctx.body = defaultReturnBody
  }
}
