/**
 *  @file 项目默认配置文件
 *  --------------------------------------------
 *  Author : xxxxxx
 *  Mail   : xxxxxx@meituan.com
 *  Date   : xxxxxx
 **/

'use strict'
const path = require('path')

const isLocal = process.env.NODE_ENV === 'local'
function resolvePath (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = appInfo => {
  const config = {
    client: {
      debug: false,
      dev: isLocal,
      entry: {
        bill: './client/bill/index.js',
        zcm: './client/zcm/index.js',
        wxapply: './client/wxapply/index.js',
        errCodeConfig: './client/errCodeConfig/index.js',
        mobile: './client/mobile/index.js'
      },
      build: {
        alias: {
          '@': resolvePath('client')
        },
        publicPath: '/static/build/',
        eslint: true,
        // typescript: true,
        tslint: false,
        extraBabelPlugins: [],
        css: ['less'],
        postcss: {
          plugins: []
        }
      }
    },
    server: {
      port: 8080,
      hlb: {
        appkey: 'com.sankuai.zc.fe.merchant'
      },
      cat: {
        appName: 'zc-fe-merchant'
      },
      security: {
        csrf: {
          ignoreJSON: true
        },
        xframe: {
          enable: false
        }
      },
      // 加载中间件
      middleware: [
        'errorHandler',
        'notfound',
        'uacMiddleware'
      ],
      // 配置 notfound 中间件的配置
      notfound: {
        // pageUrl: 'https://www.meituan.com',
      },
      view: {
        mapping: {
          '.ejs': 'ejs'
        }
      },
      ejs: {}
    }
  }

  return config
}
