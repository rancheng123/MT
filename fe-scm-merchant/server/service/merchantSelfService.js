
const Service = require('@fdfe/era-node').Service
let common = require('../common/util')

class merchantSelfService extends Service {
  /**
   * 获取故障时间
   */
  async problemTime (params) {
    let self = this
    let queryString = common.paramSerialize(params)
    let requestURL = `${common.getHostMapping('SALE', self)}/japi/device/audit/new/refund/apply`
    let result = await this.ctx.curl(requestURL,
      {
        headers: {
          'Content-Type': 'application/json',
          'userId': self.ctx.userInfo.id
        },
        dataType: 'json',
        method: 'post',
        data: params
      })
    return result.data
  }
}

module.exports = merchantSelfService
