/**
 *  @file 项目默认配置文件
 *  --------------------------------------------
 *  Author : xxxxxx
 *  Mail   : xxxxxx@meituan.com
 *  Date   : xxxxxx
 **/

'use strict'

const deployConfig = require('./deploy')

module.exports = appInfo => {
  const config = {
    client: {
      build: {
        // CDN 注入地址
        publicPath: `https://static.meituan.net/bs/${deployConfig.bsName}/file/static/build/`
      }
    },
    server: {}
  }

  return config
}
