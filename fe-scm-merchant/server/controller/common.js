/**
 *  @file 公共接口
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-05-24
 **/
'use strict'
let UAC = require('../common/uac')
let {APPKEY} = require('../common/globalConfig')
let {ConfigClient, FileConfigClient} = require('@mtfe/mt-config')
let configClient = new ConfigClient({appkey: APPKEY})

module.exports = common => {
  return class HomeController extends common.EraController {
    /**
     * 获取octo配置信息
     */
    async getMtConfig () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await configClient.get(params.key)

      this.success(result || {})
    }

    /**
     * 更改配置信息
     */
    async setMtConfig () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await configClient.set(params.key, params.value)

      this.success(result)
    }

    /**
     * 获取用户url访问权限
     */
    async getAuthUrl () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await new UAC({uid: ctx.userInfo.id}).getAuthUrl(params.url)

      this.success(result.data.data || '')
    }

    /**
     * 配置页面获取信息统一接口
     */
    async getPageDataSource () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.common.getPageDataSource(params)

      this.success(result)
    }

    /**
     * 配置页面获取信息统一接口
     */
    async postPageDataSource () {
      const {
        ctx
      } = this

      let params = ctx.request.body || ''
      let result = await this.ctx.service.common.postPageDataSource(params)

      this.success(result)
    }
  }
}
