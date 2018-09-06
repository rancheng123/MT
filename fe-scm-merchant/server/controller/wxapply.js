'use strict'
module.exports = wxapply => {
  return class extends wxapply.EraController {
    /**
     * 公众号/小程序申请配置页面
     * @returns {Promise<void>}
     */
    async index () {
      const {ctx} = this
      await ctx.setClient('wxapply')
      await this.getUserRoles()
      await ctx.render('home.ejs', {
        title: '公众号/小程序申请平台',
        userInfo: ctx.userInfo,
        node_env: process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      })
    }

    /**
     * 公众号/小程序申请记录列表页面
     * @returns {Promise<void>}
     */
    async list () {
      const {ctx} = this
      await ctx.setClient('wxapply')
      await this.getUserRoles()
      await ctx.render('home.ejs', {
        title: '公众号/小程序申请平台',
        userInfo: ctx.userInfo,
        node_env: process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      })
    }

    /**
     * 数据导出页面
     * @returns {Promise<void>}
     */
    async download () {
      const wxapplySvc = this.ctx.service.wxapply
      const params = this.ctx.request.query || {}
      const {createTimeFrom, createTimeTo, state} = params
      try {
        const list = await wxapplySvc.query(params)
        const name = `数据导出-${createTimeFrom}-${createTimeTo}-${state}`
        await wxapplySvc.download(name, list)
      } catch (e) {
        throw e
      }
    }

    /**
     * 获取申请列表
     * @returns {Promise<void>}
     */
    async getApplyList () {
      const ctx = this.ctx
      const params = ctx.request.query || {}
      const wxService = this.ctx.service.wxapply
      try {
        const result = await wxService.list(params)
        this.success(result)
      } catch (e) {
        throw e
      }
    }

    /**
     * 运营审核
     * @returns {Promise<void>}
     */
    async audit () {
      const ctx = this.ctx
      const params = ctx.request.body || {}
      const wxService = this.ctx.service.wxapply
      try {
        const result = await wxService.audit(params)
        this.success(result)
      } catch (e) {
        throw e
      }
    }

    /**
     * 门店查询获取商户信息
     * @returns {Promise<void>}
     */
    async suggest () {
      const ctx = this.ctx
      const params = ctx.request.query || {}
      const wxService = this.ctx.service.wxapply
      try {
        const result = await wxService.suggest(params)
        this.success(result)
      } catch (e) {
        throw e
      }
    }

    /**
     * 提交申请
     * @returns {Promise<void>}
     */
    async submit () {
      const ctx = this.ctx
      const params = ctx.request.body || {}
      const wxService = this.ctx.service.wxapply
      try {
        const result = await wxService.submit(params)
        this.success(result)
      } catch (e) {
        throw e
      }
    }
  }
}
