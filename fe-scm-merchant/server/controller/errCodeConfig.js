'use strict'
module.exports = errCodeConfig => {
  return class extends errCodeConfig.EraController {
    async list () {
      const {ctx} = this
      await ctx.setClient('errCodeConfig')
      // await this.getUserRoles()
      await ctx.render('home.ejs', {
        title: '错误码配置平台',
        userInfo: ctx.userInfo,
        node_env: process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      })
    }

    async home () {
      const {ctx} = this
      await ctx.setClient('errCodeConfig')
      // await this.getUserRoles()
      await ctx.render('home.ejs', {
        title: '招财猫运营后台',
        userInfo: ctx.userInfo,
        node_env: process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      })
    }

    async getSystemNameList () {
      const ctx = this.ctx
      const params = ctx.request.query || ''
      const errCodeConfig = this.ctx.service.errCodeConfig
      try {
        const result = await errCodeConfig.getSystemNameList(params)
        this.returnData(result)
      } catch (e) {
        throw e
      }
    }

    async requestErrorCodeInfo () {
      const ctx = this.ctx
      const params = ctx.request.body || {}
      const errCodeConfig = this.ctx.service.errCodeConfig
      try {
        const result = await errCodeConfig.requestErrorCodeInfo(params)
        this.returnData(result)
      } catch (e) {
        throw e
      }
    }

    async modifyErrorCodeConfigInfo () {
      const ctx = this.ctx
      const params = ctx.request.body || {}
      const errCodeConfig = this.ctx.service.errCodeConfig
      try {
        const result = await errCodeConfig.modifyErrorCodeConfigInfo(params)
        this.returnData(result)
      } catch (e) {
        throw e
      }
    }

    async getInvocationList () {
      const ctx = this.ctx
      const params = ctx.request.query || ''
      const errCodeConfig = this.ctx.service.errCodeConfig
      try {
        const result = await errCodeConfig.getInvocationList(params)
        this.returnData(result)
      } catch (e) {
        throw e
      }
    }

    async addInvocation () {
      const ctx = this.ctx
      const params = ctx.request.body || {}
      const errCodeConfig = this.ctx.service.errCodeConfig
      try {
        const result = await errCodeConfig.addInvocation(params)
        this.returnData(result)
      } catch (e) {
        throw e
      }
    }

    async updateInvocation () {
      const ctx = this.ctx
      const params = ctx.request.body || {}
      const errCodeConfig = this.ctx.service.errCodeConfig
      try {
        const result = await errCodeConfig.updateInvocation(params)
        this.returnData(result)
      } catch (e) {
        throw e
      }
    }
  }
}
