/**
 *  @file 配置文件
 *  --------------------------------------------
 *  Author : xxxxxx
 *  Mail   : xxxxxx@meituan.com
 *  Date   : xxxxxx
 **/

'use strict'

const path = require('path')
const extend = require('extend2')
const {existsSync} = require('fs')
const env = process.env.NODE_ENV || 'prod'
const defaultConfig = require('./conf.default')

if (!existsSync(path.resolve(__dirname, `./conf.${env}.js`))) {
  console.log(`❌  please create conf.${env}.js at config dir before run dev or build command`)
  process.exit(0)
}

let config = require(`./conf.${env}`)

module.exports = extend(true, {}, defaultConfig(), config())
