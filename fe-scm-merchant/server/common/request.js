/**
 *  针对于request的逻辑处理
 */
class Request {
  addHeaders (ctx, body) {
    if (body) {
      body['headers'] = {
        ...body.headers,
        userId: ctx.userInfo.id
      }
    }

    return body
  }
}

module.exports = new Request()
