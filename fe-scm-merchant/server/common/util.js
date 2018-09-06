/**
 * server端公共方法类库
 */
class Common {
  paramSerialize (params) {
    let queryString = ''
    if (params) {
      for (let p in params) {
        if (params.hasOwnProperty(p)) {
          if (params[p]) {
            queryString = `${queryString}${p}=${params[p]}&`
          }
        }
      }
    }
    return queryString.replace(/&$/, '')
  }
  getHostMapping (map, server) {
    let env = process.env.NODE_ENV
    let mapping = {
      SCMPC: {
        local: 'http://localhost:8080/',
        dev: 'http://scmpc.web.dev.sankuai.com/',
        test: 'http://scmpc.web.dev.sankuai.com/',
        prod: 'http://scmpc.zc.meituan.com/',
        staging: ''
      },
      SCP: {
        local: 'http://scp.zc.dev.meituan.com/',
        dev: 'http://scp.zc.dev.meituan.com/',
        test: 'http://scp.zc.test.meituan.com/',
        prod: 'http://scp-zc.sankuai.com/',
        staging: 'http://scp.zc.st.meituan.com/'
      },
      SALE: {
        prod: 'http://devicesale-zc.sankuai.com',
        staging: 'http://10.32.250.69:8080',
        test: 'http://devicesale.zc.test.sankuai.com',
        dev: 'http://10.21.164.232:8080',
        local: 'http://devicesale-zc.sankuai.com'
      },
      /**
       * 还是用pc 1.0的接口配置，注意后期站点下线
       */
      POS: {
        prod: 'http://coop.zc.vip.sankuai.com',
        staging: 'http://merchant.fe.st.sankuai.com',
        test: 'http://3324-wkyrw-sl-merchant.fe.test.sankuai.com',
        dev: 'http://merchant.fe.dev.sankuai.com',
        local: 'http://mtc.pos.sankuai.com/' // 'http://3324-wkyrw-sl-merchant.fe.test.sankuai.com'
      },

      COOP: {
        prod: 'http://coop.zc.vip.sankuai.com',
        staging: 'http://mtc.zc.st.sankuai.com',
        test: 'http://mtc.zc.test.sankuai.com',
        dev: 'http://10.12.28.135:8080',
        local: 'http://10.12.28.135:8080'
      },
      ERRORCODEHOST: {
        'prod': 'http://common.open.vip.sankuai.com',
        'staging': 'http://open-common.zc.st.sankuai.com',
        'test': 'http://open-common.zc.test.sankuai.com',
        'dev': 'http://open-common.zc.dev.sankuai.com',
        'local': 'http://open-common.zc.dev.sankuai.com'
      }
    }

    if (server &&
      server.ctx &&
      server.ctx.request &&
      server.ctx.request.header &&
      server.ctx.request.header.host.indexOf('wkyrw-sl-merchant') > -1 &&
      map === 'SALE'
    ) {
      return 'http://3324-wkyrw-sl-devicesale.zc.test.sankuai.com/'
    }

    if (server &&
      server.ctx &&
      server.ctx.request &&
      server.ctx.request.header &&
      server.ctx.request.header.host.indexOf('vydhn-sl-merchant') > -1 && 
      map === 'SCP'
    ) {
      return 'http://1958-vydhn-sl-scp.zc.test.sankuai.com/'
    }

    return mapping[map][env]
  }
  getSSOInfo () {
    let env = process.env.NODE_ENV

    if (env === 'prod' || env === 'staging') {
      return {
        clientId: '88562151',
        secret: '8cfeb891b8b442a09d62a2ddb9cc5895',
        protocol: 'http',
        env: 'production'
      }
    } else {
      return {
        clientId: '86148138',
        secret: 'a8f707a96780465bbf1b24b21ae9464a',
        protocol: 'http',
        env: 'development'
      }
    }
  }
}

module.exports = new Common()
